import MainHeader from "../../components/MainHeader";
import ShareFooter from "../../components/ShareFooter";

export default function TestButtonsPage() {
  return (
    <div className="min-h-screen bg-white">
      <MainHeader />

      {/* Test Buttons Section */}
      <section className="section bg-blue-50 py-16 md:py-20">
        <div className="wrapper">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-black mb-4">Button Showcase</h1>
            <p className="text-lg text-zinc-600">
              Tất cả button styles trong roomieVerse design system
            </p>
          </div>

          {/* Primary Buttons */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Primary Buttons</h2>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              <div className="card bg-white text-center">
                <h3 className="text-sm font-bold text-zinc-500 mb-4 uppercase">
                  Blue (Primary)
                </h3>
                <button className="btn-primary w-full">Roommate Theme</button>
              </div>

              <div className="card bg-white text-center">
                <h3 className="text-sm font-bold text-zinc-500 mb-4 uppercase">
                  Pink
                </h3>
                <button className="btn-pink w-full">Roomshare Theme</button>
              </div>

              <div className="card bg-white text-center">
                <h3 className="text-sm font-bold text-zinc-500 mb-4 uppercase">
                  Purple
                </h3>
                <button className="btn-purple w-full">Premium</button>
              </div>

              <div className="card bg-white text-center">
                <h3 className="text-sm font-bold text-zinc-500 mb-4 uppercase">
                  Yellow
                </h3>
                <button className="btn-yellow w-full">Promotional</button>
              </div>

              <div className="card bg-white text-center">
                <h3 className="text-sm font-bold text-zinc-500 mb-4 uppercase">
                  Green
                </h3>
                <button className="btn-green w-full">Success</button>
              </div>

              <div className="card bg-white text-center">
                <h3 className="text-sm font-bold text-zinc-500 mb-4 uppercase">
                  Orange
                </h3>
                <button className="btn-orange w-full">Alert</button>
              </div>

              <div className="card bg-white text-center">
                <h3 className="text-sm font-bold text-zinc-500 mb-4 uppercase">
                  Gray
                </h3>
                <button className="btn-gray w-full">Disabled</button>
              </div>

              <div className="card bg-white text-center">
                <h3 className="text-sm font-bold text-zinc-500 mb-4 uppercase">
                  White (Secondary)
                </h3>
                <button className="btn-secondary w-full">Neutral</button>
              </div>
            </div>
          </div>

          {/* Button Sizes */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Button Sizes</h2>
            <div className="card bg-white">
              <div className="flex flex-col gap-4 items-center">
                <button className="btn-primary text-xs px-4 py-2">
                  Extra Small
                </button>
                <button className="btn-primary text-sm px-6 py-2.5">
                  Small
                </button>
                <button className="btn-primary text-base px-8 py-3">
                  Medium (Default)
                </button>
                <button className="btn-primary text-lg px-10 py-4">
                  Large
                </button>
                <button className="btn-primary text-xl px-12 py-5">
                  Extra Large
                </button>
              </div>
            </div>
          </div>

          {/* Button States */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Button States</h2>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              <div className="card bg-white text-center">
                <h3 className="text-sm font-bold text-zinc-500 mb-4 uppercase">
                  Normal
                </h3>
                <button className="btn-primary w-full">Click Me</button>
              </div>

              <div className="card bg-white text-center">
                <h3 className="text-sm font-bold text-zinc-500 mb-4 uppercase">
                  Hover
                </h3>
                <button className="btn-primary w-full hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none">
                  Hover Me
                </button>
              </div>

              <div className="card bg-white text-center">
                <h3 className="text-sm font-bold text-zinc-500 mb-4 uppercase">
                  Disabled
                </h3>
                <button className="btn-gray w-full opacity-50 cursor-not-allowed" disabled>
                  Disabled
                </button>
              </div>
            </div>
          </div>

          {/* Button Combinations */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Common Combinations</h2>

            {/* Two Buttons Side by Side */}
            <div className="card bg-white mb-6">
              <h3 className="text-lg font-bold mb-4">Two Buttons (Primary + Secondary)</h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="btn-primary text-base px-8 py-4 min-w-[200px]">
                  Primary Action
                </button>
                <button className="btn-secondary text-base px-8 py-4 min-w-[200px]">
                  Secondary Action
                </button>
              </div>
            </div>

            {/* Theme Buttons */}
            <div className="card bg-white mb-6">
              <h3 className="text-lg font-bold mb-4">Theme Buttons (Roommate vs Roomshare)</h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="btn-primary text-base px-8 py-4 min-w-[200px]">
                  💙 Tìm Roommate
                </button>
                <button className="btn-pink text-base px-8 py-4 min-w-[200px]">
                  🌸 Tìm Phòng Share
                </button>
              </div>
            </div>

            {/* Three Buttons */}
            <div className="card bg-white">
              <h3 className="text-lg font-bold mb-4">Three Buttons</h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="btn-green text-base px-6 py-3">
                  Confirm
                </button>
                <button className="btn-yellow text-base px-6 py-3">
                  Warning
                </button>
                <button className="btn-gray text-base px-6 py-3">
                  Cancel
                </button>
              </div>
            </div>
          </div>

          {/* Code Examples */}
          <div className="card bg-zinc-900 text-white">
            <h2 className="text-2xl font-bold mb-4">Usage</h2>
            <div className="space-y-4 font-mono text-sm">
              <div>
                <p className="text-zinc-400 mb-2">// Blue (Roommate theme)</p>
                <code className="text-blue-300">{`<button className="btn-primary">Tìm Roommate</button>`}</code>
              </div>

              <div>
                <p className="text-zinc-400 mb-2">// Pink (Roomshare theme)</p>
                <code className="text-pink-300">{`<button className="btn-pink">Tìm Phòng Share</button>`}</code>
              </div>

              <div>
                <p className="text-zinc-400 mb-2">// Purple (Premium)</p>
                <code className="text-purple-300">{`<button className="btn-purple">Premium Feature</button>`}</code>
              </div>

              <div>
                <p className="text-zinc-400 mb-2">// Custom size</p>
                <code className="text-yellow-300">{`<button className="btn-primary text-lg px-10 py-4">Large Button</button>`}</code>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ShareFooter />
    </div>
  );
}
