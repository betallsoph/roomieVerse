import {
  collection, doc, getDocs, setDoc, updateDoc,
  query, where, orderBy, serverTimestamp, Timestamp,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import { FIREBASE_ENABLED } from "../lib/config";
import { Report } from "./types";

const COLLECTION_NAME = "reports";

function timestampToString(ts: unknown): string {
  if (!ts) return new Date().toISOString();
  if (ts instanceof Timestamp) return ts.toDate().toISOString();
  if (typeof ts === "string") return ts;
  return new Date().toISOString();
}

function docToReport(docSnap: { id: string; data: () => Record<string, unknown> }): Report {
  const d = docSnap.data();
  return {
    id: docSnap.id,
    listingId: (d.listingId as string) || "",
    reportedBy: (d.reportedBy as string) || "",
    reason: (d.reason as string) || "",
    details: d.details as string | undefined,
    status: (d.status as Report["status"]) || "pending",
    reviewedBy: d.reviewedBy as string | undefined,
    createdAt: timestampToString(d.createdAt),
    reviewedAt: d.reviewedAt ? timestampToString(d.reviewedAt) : undefined,
  };
}

/** Create a new report */
export async function createReport(data: {
  listingId: string;
  reportedBy: string;
  reason: string;
  details?: string;
}): Promise<string> {
  if (!FIREBASE_ENABLED || !db) {
    console.log("Report (mock):", data);
    return "mock-report-id";
  }

  const reportId = `rpt-${Date.now()}`;
  const docRef = doc(db, COLLECTION_NAME, reportId);
  await setDoc(docRef, {
    ...data,
    status: "pending",
    createdAt: serverTimestamp(),
  });
  return reportId;
}

/** Get all pending reports (admin) */
export async function getPendingReports(): Promise<Report[]> {
  if (!FIREBASE_ENABLED || !db) return [];

  const q = query(
    collection(db, COLLECTION_NAME),
    where("status", "==", "pending"),
    orderBy("createdAt", "desc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => docToReport(d as unknown as { id: string; data: () => Record<string, unknown> }));
}

/** Get all reports (admin) */
export async function getAllReports(): Promise<Report[]> {
  if (!FIREBASE_ENABLED || !db) return [];

  const q = query(
    collection(db, COLLECTION_NAME),
    orderBy("createdAt", "desc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => docToReport(d as unknown as { id: string; data: () => Record<string, unknown> }));
}

/** Update report status (admin) */
export async function updateReportStatus(
  reportId: string,
  status: "reviewed" | "resolved",
  reviewedBy: string
): Promise<void> {
  if (!FIREBASE_ENABLED || !db) return;

  const docRef = doc(db, COLLECTION_NAME, reportId);
  await updateDoc(docRef, {
    status,
    reviewedBy,
    reviewedAt: serverTimestamp(),
  });
}
