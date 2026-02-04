"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import MainHeader from "../../components/MainHeader";
import ShareFooter from "../../components/ShareFooter";
import ProtectedRoute from "../../components/ProtectedRoute";
import { useAuth } from "../../contexts/AuthContext";
import { Loader2 } from "lucide-react";
import { getUserProfile, saveUserProfile } from "../../data/users";
import { UserProfile } from "../../data/types";

export default function LifestylePage() {
  const { user } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [profileData, setProfileData] = useState<UserProfile | null>(null);

  // Lifestyle form state
  const [schedule, setSchedule] = useState<string>("");
  const [cleanlinessLevel, setCleanlinessLevel] = useState<number>(2); // 0: Bừa bộn, 1: Thoải mái, 2: Bình thường, 3: Siêu sạch sẽ
  const [habits, setHabits] = useState<string[]>([]);
  const [otherHabits, setOtherHabits] = useState("");

  const cleanlinessLabels = ["Bừa bộn", "Thoải mái", "Bình thường", "Siêu sạch sẽ"];
  const cleanlinessValues = ["messy", "relaxed", "normal", "very-clean"];

  // Load profile from Firestore
  useEffect(() => {
    async function loadData() {
      if (!user) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);

      try {
        const profile = await getUserProfile(user.uid);
        if (profile) {
          setProfileData(profile);
          // Load lifestyle data if exists
          if (profile.lifestyle) {
            setSchedule(profile.lifestyle.schedule?.[0] || "");
            // Convert cleanliness array to level
            const cleanVal = profile.lifestyle.cleanliness?.[0];
            if (cleanVal === "messy") setCleanlinessLevel(0);
            else if (cleanVal === "relaxed") setCleanlinessLevel(1);
            else if (cleanVal === "very-clean") setCleanlinessLevel(3);
            else setCleanlinessLevel(2); // default to normal
            setHabits(profile.lifestyle.habits || []);
            setOtherHabits(profile.lifestyle.otherHabits || "");
          }
        }
      } catch (error) {
        console.error("Error loading profile data:", error);
      }

      setIsLoading(false);
    }

    loadData();
  }, [user]);

  const toggleOption = (
    value: string,
    current: string[],
    setter: (val: string[]) => void
  ) => {
    if (current.includes(value)) {
      setter(current.filter((v) => v !== value));
    } else {
      setter([...current, value]);
    }
  };

  const handleSave = async () => {
    if (!user || !profileData) return;

    setIsSaving(true);

    const updatedProfile: UserProfile = {
      ...profileData,
      lifestyle: {
        schedule: schedule ? [schedule] : [],
        cleanliness: [cleanlinessValues[cleanlinessLevel]],
        habits,
        otherHabits,
      },
    };

    try {
      await saveUserProfile(updatedProfile);
      setProfileData(updatedProfile);
      router.push("/profile");
    } catch (error) {
      console.error("Error saving lifestyle:", error);
    }

    setIsSaving(false);
  };

  if (isLoading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-white">
          <MainHeader />
          <div className="flex min-h-[60vh] items-center justify-center">
            <Loader2 className="h-12 w-12 animate-spin text-zinc-400" />
          </div>
          <ShareFooter />
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-white">
        <MainHeader />

        {/* Hero Section */}
        <section className="bg-blue-50 py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-8">
              <h1 className="mb-4 text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl">
                Hồ sơ lối sống
              </h1>
              <p className="max-w-2xl text-base sm:text-lg text-zinc-700">
                Chia sẻ thói quen và sở thích của bạn để tìm roommate phù hợp
              </p>
            </div>

            {/* Lifestyle Form */}
            <div className="card bg-white p-8">
              <div className="space-y-8">
                {/* Cleanliness Slider */}
                <div>
                  <label className="block text-sm font-bold mb-3">
                    Mức độ sạch sẽ
                  </label>
                  <div className="px-2">
                    {/* Track with clickable dots */}
                    <div className="relative h-4 flex items-center">
                      {/* Track line */}
                      <div className="absolute left-2 right-2 h-2 bg-zinc-200 rounded-full border-2 border-black" />
                      {/* Filled track */}
                      <div
                        className="absolute left-2 h-2 bg-blue-300 rounded-full border-2 border-black"
                        style={{ width: `calc(${(cleanlinessLevel / 3) * 100}% - 8px)` }}
                      />
                      {/* Dots */}
                      <div className="relative w-full flex justify-between">
                        {[0, 1, 2, 3].map((index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => setCleanlinessLevel(index)}
                            className={`w-6 h-6 rounded-full border-2 border-black transition-all cursor-pointer z-10
                              ${cleanlinessLevel === index
                                ? "bg-blue-500 shadow-[2px_2px_0_0_#000] scale-110"
                                : cleanlinessLevel > index
                                  ? "bg-blue-300 hover:bg-blue-400"
                                  : "bg-white hover:bg-zinc-100"
                              }`}
                          />
                        ))}
                      </div>
                    </div>
                    {/* Labels */}
                    <div className="flex justify-between mt-3 -mx-8">
                      {cleanlinessLabels.map((label, index) => (
                        <button
                          key={label}
                          type="button"
                          onClick={() => setCleanlinessLevel(index)}
                          className={`text-sm cursor-pointer transition-all text-center w-24 whitespace-nowrap ${cleanlinessLevel === index
                            ? "font-bold text-blue-600"
                            : "text-zinc-500 hover:text-zinc-700"
                            }`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Schedule */}
                <div>
                  <label className="block text-sm font-bold mb-3">
                    Giờ giấc sinh hoạt
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {[
                      { value: "early", label: "Ngủ sớm, dậy sớm" },
                      { value: "late", label: "Cú đêm" },
                      { value: "flexible", label: "Linh hoạt" },
                    ].map((option) => (
                      <label
                        key={option.value}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 cursor-pointer transition-colors ${schedule === option.value
                          ? "border-blue-500 bg-blue-50"
                          : "border-black bg-white hover:bg-zinc-50"
                          }`}
                      >
                        <input
                          type="radio"
                          name="schedule"
                          checked={schedule === option.value}
                          onChange={() => setSchedule(option.value)}
                          className="w-4 h-4 appearance-none border-2 border-black rounded-full checked:bg-blue-500 checked:border-blue-500 cursor-pointer"
                        />
                        <span className="text-sm">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Habits */}
                <div>
                  <label className="block text-sm font-bold mb-3">
                    Thói quen
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {[
                      { value: "smoke", label: "Hút thuốc" },
                      { value: "drink", label: "Uống rượu bia" },
                      { value: "loud", label: "Ồn ào, hay mở nhạc" },
                      { value: "quiet", label: "Yên lặng" },
                      { value: "gamer", label: "Hay chơi game" },
                      { value: "long-shower", label: "Tắm lâu" },
                      { value: "cook", label: "Hay nấu ăn" },
                      { value: "wfh", label: "Làm việc tại nhà" },
                      { value: "invite-friends", label: "Hay mời bạn về chơi" },
                      { value: "introvert", label: "Thích ở một mình" },
                    ].map((option) => (
                      <label
                        key={option.value}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 cursor-pointer transition-colors ${habits.includes(option.value)
                          ? "border-blue-500 bg-blue-50"
                          : "border-black bg-white hover:bg-zinc-50"
                          }`}
                      >
                        <input
                          type="checkbox"
                          checked={habits.includes(option.value)}
                          onChange={() =>
                            toggleOption(option.value, habits, setHabits)
                          }
                          className="w-4 h-4 rounded-full appearance-none border-2 border-black checked:bg-blue-500 checked:border-blue-500 cursor-pointer"
                        />
                        <span className="text-sm">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Pet */}
                <div>
                  <label className="block text-sm font-bold mb-3">
                    Thú cưng
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {[
                      { value: "has-pet", label: "Đang nuôi thú cưng" },
                      { value: "want-pet", label: "Muốn nuôi thú cưng" },
                      { value: "no-pet", label: "Không nuôi thú cưng" },
                      { value: "pet-allergy", label: "Dị ứng lông thú cưng" },
                    ].map((option) => (
                      <label
                        key={option.value}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 cursor-pointer transition-colors ${habits.includes(option.value)
                          ? "border-blue-500 bg-blue-50"
                          : "border-black bg-white hover:bg-zinc-50"
                          }`}
                      >
                        <input
                          type="checkbox"
                          checked={habits.includes(option.value)}
                          onChange={() =>
                            toggleOption(option.value, habits, setHabits)
                          }
                          className="w-4 h-4 rounded-full appearance-none border-2 border-black checked:bg-blue-500 checked:border-blue-500 cursor-pointer"
                        />
                        <span className="text-sm">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Other Habits */}
                <div>
                  <label className="block text-sm font-bold mb-3">Khác</label>
                  <input
                    type="text"
                    value={otherHabits}
                    onChange={(e) => setOtherHabits(e.target.value)}
                    placeholder="Thói quen hoặc sở thích khác của bạn..."
                    className="w-full px-4 py-3 rounded-lg border-2 border-black focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                {/* Submit Button */}
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => router.back()}
                    className="btn-secondary flex-1"
                  >
                    Để sau
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="btn-primary flex-1 flex items-center justify-center gap-2 min-w-[140px] relative"
                  >
                    <span className={isSaving ? "opacity-0" : ""}>Lưu thay đổi</span>
                    {isSaving && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ShareFooter />
      </div>
    </ProtectedRoute>
  );
}
