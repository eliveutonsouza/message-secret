import type { User, Letter, PaymentStatus } from "@prisma/client";

export type { User, Letter, PaymentStatus };

export type LetterWithUser = Letter & {
  user: User;
};

export type CreateLetterData = {
  userId: string;
  title?: string;
  content: string;
  releaseDate: Date;
  uniqueLink: string;
  status?: "DRAFT" | "ACTIVE" | "ARCHIVED";
  accessPassword?: string;
  maxViews?: number;
  expiresAt?: Date;
};

export type UpdateLetterData = Partial<{
  title: string;
  content: string;
  releaseDate: Date;
  isFavorite: boolean;
  paymentStatus: PaymentStatus;
  paymentId: string;
  status: "DRAFT" | "ACTIVE" | "ARCHIVED";
  accessPassword: string | null;
  maxViews: number | null;
  expiresAt: Date | null;
}>;
