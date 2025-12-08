import { toast } from "react-hot-toast";
import { CircleCheckBig, CircleAlert } from "lucide-react";

const ToastWithProgress = (message, type = "success") => {
  const duration = 3500;

  return toast.custom(
    (t) => (
      <div
        key={t.id}
        className={`relative overflow-hidden rounded-2xl shadow-2xl max-w-xs w-full mx-auto transform-gpu ${
          t.visible ? "animate-slideIn" : "animate-slideOut"
        }`}
        style={{
          background:
            type === "success"
              ? "linear-gradient(135deg, #2D6153, #3A9064)"
              : "linear-gradient(135deg, #4a2d2d, #643a3a)",
          color: "#E2E0DE",
          padding: "18px 24px",
          minWidth: "360px",
          fontFamily: "Montserrat, sans-serif",
          fontWeight: "600",
          fontSize: "13px",
        }}
      >
        <div className="flex items-center gap-4">
          {type === "success" ? (
            <CircleCheckBig
              className="w-8 h-8 text-#E2E0DE m-0.5"
              strokeWidth={2.5}
            />
          ) : (
            <CircleAlert
              className="w-8 h-8 text-#E2E0DE m-0.5"
              strokeWidth={2.5}
            />
          )}

          <div className="flex-1">
            {/* Judul gede */}
            <h3 className="text-lg font-bold mb-1">
              {type === "success" ? "Success!" : "Error!"}
            </h3>
            <p className="text-sm font-semibold mb-2 leading-tight tracking-wide break-words hyphens-auto">
              {message}
            </p>
          </div>

          <button
            onClick={() => toast.dismiss(t.id)}
            className="text-[#E2E0DE]/100 hover:text-[#BFBEBD] transition cursor-pointer"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* PROGRESS BAR */}
        <div className="absolute bottom-0 left-0 h-1.5 w-full bg-white/20">
          <div
            className="h-full bg-white/50"
            style={{
              animation: t.visible
                ? `shrink ${duration}ms linear forwards`
                : "none",
            }}
          />
        </div>

        {/* Animasi shrink */}
        <style jsx>{`
          @keyframes shrink {
            from {
              width: 100%;
            }
            to {
              width: 0%;
            }
          }
        `}</style>
      </div>
    ),
    {
      duration: duration,
      position: "top-center",
      id: `custom-toast-${Date.now()}-${Math.random()
        .toString(36)
        .substr(2, 9)}`,
    }
  );
};

export const toastSuccess = (msg) => ToastWithProgress(msg, "success");
export const toastError = (msg) => ToastWithProgress(msg, "error");
