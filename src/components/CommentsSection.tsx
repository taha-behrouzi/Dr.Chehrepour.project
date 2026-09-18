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

export default function CommentsSection({ targetId }: