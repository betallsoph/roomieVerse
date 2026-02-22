"use client";

import { useState, useEffect } from "react";
import MainHeader from "../../components/MainHeader";
import ShareFooter from "../../components/ShareFooter";
import Link from "next/link";
import { ArrowLeft, Loader2, Shield } from "lucide-react";
import { getAllUsers, setUserRole } from "../../data/users";
import { UserProfile, UserRole } from "../../data/types";
import { useAuth } from "../../contexts/AuthContext";

const ROLE_BADGE: Record<UserRole, { label: string; color: string }> = {
  user: { label: "User", color: "bg-blue-100" },
  mod: { label: "Mod", color: "bg-green-100" },
  tester: { label: "Tester", color: "bg-amber-100" },
  admin: { label: "Admin", color: "bg-red-100" },
};

export default function ManagementPage() {
  const { isAdmin } = useAuth();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingRole, setUpdatingRole] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const allUsers = await getAllUsers();
        setUsers(allUsers);
      } catch (error) {
        console.error("Error fetching management data:", error);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  const staff = users.filter(u => u.role && u.role !== "user");
  const regulars = users.filter(u => !u.role || u.role === "user");

  const handleRoleChange = async (uid: string, newRole: UserRole) => {
    setUpdatingRole(uid);
    try {
      await setUserRole(uid, newRole);
      setUsers(prev => prev.map(u => u.uid === uid ? { ...u, role: newRole } : u));
    } catch (error) {
      console.error("Error updating role:", error);
      alert("Cập nhật role thất bại.");
    }
    setUpdatingRole(null);
  };

  function UserRow({ user, list, idx, showDetail = true }: { user: UserProfile; list: UserProfile[]; idx: number; showDetail?: boolean }) {
    const role = (user.role as UserRole) || "user";
    const badge = ROLE_BADGE[role] || ROLE_BADGE.user;
    return (
      <div className={`flex flex-col md:flex-row md:items-center justify-between gap-3 p-4 ${idx !== list.length - 1 ? 'border-b border-zinc-200' : ''} hover:bg-blue-50/50 transition-colors`}>
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {user.photoURL ? (
            <img src={user.photoURL} alt="" className="w-10 h-10 border-2 border-black rounded-full object-cover flex-shrink-0" />
          ) : (
            <div className="w-10 h-10 bg-blue-100 border-2 border-black rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
              {user.displayName?.charAt(0)?.toUpperCase() || "?"}
            </div>
          )}
          <div className="min-w-0">
            <h3 className="font-bold truncate">{user.displayName || "Ẩn danh"}</h3>
            <p className="text-sm text-zinc-500 truncate">{user.email}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          {role === "admin" ? (
            <span className="px-2 py-0.5 text-xs font-bold rounded border-2 border-black bg-red-100">
              Admin
            </span>
          ) : isAdmin ? (
            <select
              value={role}
              onChange={(e) => handleRoleChange(user.uid, e.target.value as UserRole)}
              disabled={updatingRole === user.uid}
              className={`px-2 py-1 text-xs font-bold rounded border-2 border-black ${badge.color} cursor-pointer disabled:opacity-50`}
            >
              <option value="user">User</option>
              <option value="mod">Mod</option>
              <option value="tester">Tester</option>
            </select>
          ) : (
            <span className={`px-2 py-0.5 text-xs font-bold rounded border border-black ${badge.color}`}>
              {badge.label}
            </span>
          )}
          {showDetail && user.createdAt && (
            <span className="text-xs text-zinc-400 hidden md:block">{user.createdAt.slice(0, 10)}</span>
          )}
          {showDetail && (
            <Link
              href={`/user/${user.uid}`}
              className="px-3 py-1.5 text-xs font-semibold border-2 border-black rounded-lg hover:bg-zinc-100 transition-colors"
            >
              Chi tiết
            </Link>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-50">
      <MainHeader />

      <section className="py-12 md:py-16">
        <div className="wrapper max-w-5xl">
          {/* Header */}
          <div className="mb-10">
            <Link href="/admin" className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-500 hover:text-black transition-colors mb-6">
              <ArrowLeft className="w-4 h-4" />
              Quay lại
            </Link>
            <h1 className="text-3xl md:text-4xl font-black">Quản Lý User</h1>
            <p className="text-zinc-500 mt-1">
              {loading ? "..." : `${regulars.length} người dùng`}
              {!loading && staff.length > 0 && ` · ${staff.length} staff`}
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-6 h-6 animate-spin text-zinc-400" />
            </div>
          ) : users.length === 0 ? (
            <p className="text-zinc-500 py-8 text-center">Chưa có người dùng nào.</p>
          ) : (
            <>
              {/* Staff */}
              {staff.length > 0 && (
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-lg font-bold">Staff</h2>
                    <span className="text-sm text-zinc-400">{staff.length} thành viên</span>
                  </div>
                  <div className="border-2 border-black rounded-xl overflow-hidden bg-white">
                    {staff.map((user, idx) => (
                      <UserRow key={user.uid} user={user} list={staff} idx={idx} showDetail={false} />
                    ))}
                  </div>
                </div>
              )}

              {/* Regular users */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-lg font-bold">Người Dùng</h2>
                  <span className="text-sm text-zinc-400">{regulars.length} người dùng</span>
                </div>
                {regulars.length === 0 ? (
                  <p className="text-zinc-500 py-8 text-center">Chưa có người dùng thường nào.</p>
                ) : (
                  <div className="border-2 border-black rounded-xl overflow-hidden bg-white">
                    {regulars.map((user, idx) => (
                      <UserRow key={user.uid} user={user} list={regulars} idx={idx} />
                    ))}
                  </div>
                )}
              </div>
            </>
          )}

          {/* Role legend */}
          <div className="mt-8 flex flex-wrap gap-3 items-center text-xs text-zinc-500">
            <Shield className="w-4 h-4" />
            <span><strong>User</strong> — người dùng thường</span>
            <span>|</span>
            <span><strong>Mod</strong> — duyệt bài</span>
            <span>|</span>
            <span><strong>Tester</strong> — duyệt + tuỳ chọn bypass + quản lý</span>
            <span>|</span>
            <span><strong>Admin</strong> — toàn quyền</span>
          </div>
        </div>
      </section>

      <ShareFooter />
    </div>
  );
}
