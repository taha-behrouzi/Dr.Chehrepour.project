"use client";

import { useState, useEffect, useCallback } from "react";

interface CommentUser {
  name: string | null;
}

interface CommentItem {
  id: string;
  content: string;
  rating: number | null;
  createdAt: string;
  user: CommentUser | null;
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
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchComments = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/comments?targetId=${encodeURIComponent(targetId)}`);
      if (res.ok) {
        const data = await res.json();
        setComments(data);
      }
    } catch (error) {
      console.error("Failed to load comments:", error);
    } finally {
      setIsLoading(false);
    }
  }, [targetId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    setSuccessMessage(null);
    setErrorMessage(null);

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
        throw new Error(data.error || "خطایی رخ داده است.");
      }

      setSuccessMessage(data.message || "دیدگاه شما ثبت شد و پس از تایید نمایش داده می‌شود.");
      setNewComment("");
      setRating(5);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("خطا در ارسال دیدگاه.");
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
          className={`w-5 h-5 ${starValue <= count ? "text-[#D4AF37] fill-[#D4AF37]" : "text-gray-600 fill-transparent"}`}
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
    <section className="bg-[#0B132B] text-[#F3F4F6] p-6 rounded-2xl border border-[#D4AF37]/20 dir-rtl text-right space-y-8">
      <h3 className="text-xl font-bold text-[#D4AF37] border-b border-[#D4AF37]/20 pb-3">
        دیدگاه‌ها و امتیاز کاربران
      </h3>

      {/* Submission Form */}
      <form onSubmit={handleSubmit} className="bg-[#16223B] p-5 rounded-xl space-y-4 border border-[#D4AF37]/10">
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-300">
            امتیاز شما:
          </label>
          <div className="flex items-center gap-1 dir-ltr justify-end">
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
                  className={`w-7 h-7 ${(hoverRating || rating) >= star ? "text-[#D4AF37] fill-[#D4AF37]" : "text-gray-500 fill-transparent"}`}
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
          <label htmlFor="commentText" className="block text-sm font-medium mb-2 text-gray-300">
            دیدگاه شما:
          </label>
          <textarea
            id="commentText"
            rows={4}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="نظر خود را بنویسید..."
            required
            className="w-full p-3 bg-[#0B132B] text-white border border-[#D4AF37]/30 rounded-lg focus:outline-none focus:border-[#D4AF37] placeholder-gray-500 text-sm"
          />
        </div>

        {successMessage && (
          <div className="p-3 bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-sm rounded-lg">
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="p-3 bg-red-950/80 border border-red-500/30 text-red-300 text-sm rounded-lg">
            {errorMessage}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2.5 bg-[#D4AF37] hover:bg-[#c09d2e] text-[#0B132B] font-bold text-sm rounded-lg transition duration-200 disabled:opacity-50"
        >
          {isSubmitting ? "در حال ارسال..." : "ثبت دیدگاه"}
        </button>
      </form>

      {/* Comments List */}
      <div className="space-y-4">
        {isLoading ? (
          <p className="text-gray-400 text-sm text-center py-4">در حال بارگذاری دیدگاه‌ها...</p>
        ) : comments.length === 0 ? (
          <p className="text-gray-400 text-sm text-center py-4">هنوز دیدگاهی ثبت نشده است.</p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="bg-[#16223B] p-4 rounded-xl border border-[#D4AF37]/10 space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm text-gray-200">
                  {comment.user?.name || "کاربر"}
                </span>
                <span className="text-xs text-gray-400 dir-ltr">
                  {new Date(comment.createdAt).toLocaleDateString("fa-IR")}
                </span>
              </div>

              {comment.rating && (
                <div className="flex items-center gap-1 dir-ltr justify-end">
                  {renderStars(comment.rating)}
                </div>
              )}

              <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-line pt-1">
                {comment.content}
              </p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
