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
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

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
        throw new Error(data.error || "خطایی رخ داده است.");
      }

      const successMsg = "دیدگاه شما ثبت شد و پس از تایید نمایش داده میشود.";
      setFeedbackMessage(successMsg);
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
            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.6