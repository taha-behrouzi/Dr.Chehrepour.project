"use client";

import { useState, useEffect, FormEvent } from "react";

interface CommentItem {
  id: string;
  content: string;
  rating?: number;
  createdAt: string;
  user?: {
    name?: string;
  };
}

interface CommentsSectionProps {
  targetId: string;
}

export default function CommentsSection({ targetId }: CommentsSectionProps) {
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchComments() {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/comments?targetId=${encodeURIComponent(targetId)}`);
        if (res.ok) {
          const data = await res.json();
          if (isMounted) {
            setComments(data);
          }
        }
      } catch (error) {
        console.error("Failed to load comments:", error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    if (targetId) {
      fetchComments();
    }

    return () => {
      isMounted = false;
    };
  }, [targetId]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || isSubmitting) return;

    setIsSubmitting(true);
    setFeedbackMessage(null);

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: newComment,
          rating,
          targetId,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "خطایی در ثبت دیدگاه رخ داد.");
      }

      setFeedbackMessage("دیدگاه شما ثبت شد و پس از تایید نمایش داده می‌شود.");
      setNewComment("");
      setRating(5);

      setTimeout(() => {
        setFeedbackMessage(null);
      }, 5000);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setFeedbackMessage(err.message);
      } else {
        setFeedbackMessage("خطا در ارسال دیدگاه.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = (count: number) => {
    return Array.from({ length: 5 }).map((_, idx) => {
      const starValue = idx + 1;
      return (
        <svg
          key={idx}
          className={`w-4 h-4 ${starValue <= count ? "text-[#D4AF37] fill-[#D4AF37]" : "text-[#374151] fill-transparent"}`}
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385c.116.486-.414.87-.828.616l-4.707-2.88a.563.563 0 00-.58 0l-4.707 2.88c-.414.254-.944-.13-.828-.616l1.285-5.385a.563.563 0 00-.182-.557l-4.204-3.602c-.38-.325-.178-.948.32-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
          />
        </svg>
      );
    });
  };

  return (
    <div className="bg-[#0B132B] text-white p-6 rounded-2xl text-right dir-rtl space-y-8">
      <h3 className="text-xl font-bold text-white border-b border-slate-700/50 pb-3">
        دیدگاه‌ها و نظرات کاربران
      </h3>

      {/* Comment Submission Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2 text-slate-300">
            امتیاز شما:
          </label>
          <div className="flex items-center gap-1 justify-start">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="focus:outline-none transition-transform hover:scale-110"
              >
                <svg
                  className={`w-6 h-6 ${(hoverRating || rating) >= star ? "text-[#D4AF37] fill-[#D4AF37]" : "text-[#374151] fill-transparent"}`}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385c.116.486-.414.87-.828.616l-4.707-2.88a.563.563 0 00-.58 0l-4.707 2.88c-.414.254-.944-.13-.828-.616l1.285-5.385a.563.563 0 00-.182-.557l-4.204-3.602c-.38-.325-.178-.948.32-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                  />
                </svg>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="commentText" className="block text-sm font-medium mb-2 text-slate-300">
            متن دیدگاه:
          </label>
          <textarea
            id="commentText"
            rows={4}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="دیدگاه یا تجربه خود را بنویسید..."
            required
            className="w-full p-3 bg-[#16223B] text-white border border-slate-700 rounded-xl focus:outline-none focus:border-teal-500 placeholder-slate-400 text-sm"
          />
        </div>

        {feedbackMessage && (
          <div className="p-3 bg-teal-950/80 border border-teal-500/30 text-teal-300 text-sm rounded-xl">
            {feedbackMessage}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-[#14B8A6] hover:bg-[#0d9488] text-white font-medium py-2.5 px-6 rounded-xl transition duration-200 disabled:opacity-50 text-sm"
        >
          {isSubmitting ? "در حال ثبت..." : "ثبت دیدگاه"}
        </button>
      </form>

      {/* Approved Comments List */}
      <div className="space-y-3 pt-2">
        {isLoading ? (
          <p className="text-slate-400 text-sm text-center py-4">در حال بارگذاری دیدگاه‌ها...</p>
        ) : comments.length === 0 ? (
          <p className="text-slate-400 text-sm text-center py-4">
            هنوز دیدگاهی ثبت نشده است. اولین نفری باشید که نظر می دهید.
          </p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="bg-[#16223B] border border-slate-700/50 p-4 rounded-xl mt-4 space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm text-slate-200">
                  {comment.user?.name || "کاربر"}
                </span>
                <span className="text-xs text-slate-400">
                  {new Date(comment.createdAt).toLocaleDateString("fa-IR")}
                </span>
              </div>

              {comment.rating && (
                <div className="flex items-center gap-1 justify-start">
                  {renderStars(comment.rating)}
                </div>
              )}

              <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line pt-1">
                {comment.content}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
