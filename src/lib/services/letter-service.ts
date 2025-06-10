import { prisma } from "@/lib/prisma"
import type { CreateLetterData, UpdateLetterData } from "@/lib/types/database"
import type { LetterFiltersInput } from "@/lib/validations"
import { PaymentStatus } from "@prisma/client"

export class LetterService {
  static async createLetter(data: CreateLetterData) {
    return await prisma.letter.create({
      data,
      include: {
        user: true,
      },
    })
  }

  static async getLettersByUserId(userId: string) {
    return await prisma.letter.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      include: {
        user: true,
      },
    })
  }

  static async getFilteredLetters(userId: string, filters: LetterFiltersInput) {
    const where: any = { userId }

    if (filters.status !== "all") {
      where.paymentStatus = filters.status.toUpperCase() as PaymentStatus
    }

    if (filters.favorite !== undefined) {
      where.isFavorite = filters.favorite
    }

    if (filters.search) {
      where.OR = [
        { title: { contains: filters.search, mode: "insensitive" } },
        { content: { contains: filters.search, mode: "insensitive" } },
      ]
    }

    return await prisma.letter.findMany({
      where,
      orderBy: { [filters.sortBy]: filters.sortOrder },
      include: {
        user: true,
      },
    })
  }

  static async getLetterByUniqueLink(uniqueLink: string) {
    return await prisma.letter.findUnique({
      where: { uniqueLink },
      include: {
        user: true,
      },
    })
  }

  static async getLetterById(id: string) {
    return await prisma.letter.findUnique({
      where: { id },
      include: {
        user: true,
      },
    })
  }

  static async updateLetter(id: string, data: UpdateLetterData) {
    return await prisma.letter.update({
      where: { id },
      data,
      include: {
        user: true,
      },
    })
  }

  static async deleteLetter(id: string) {
    return await prisma.letter.delete({
      where: { id },
    })
  }

  static async toggleFavorite(id: string) {
    const letter = await prisma.letter.findUnique({
      where: { id },
      select: { isFavorite: true },
    })

    if (!letter) {
      throw new Error("Carta não encontrada")
    }

    return await prisma.letter.update({
      where: { id },
      data: { isFavorite: !letter.isFavorite },
      include: {
        user: true,
      },
    })
  }

  static async updatePaymentStatus(id: string, paymentStatus: PaymentStatus, paymentId?: string) {
    return await prisma.letter.update({
      where: { id },
      data: {
        paymentStatus,
        paymentId,
      },
      include: {
        user: true,
      },
    })
  }

  static async getLettersReadyToRelease() {
    const now = new Date()
    return await prisma.letter.findMany({
      where: {
        releaseDate: {
          lte: now,
        },
        paymentStatus: PaymentStatus.PAID,
      },
      include: {
        user: true,
      },
    })
  }

  static async getLetterStats(userId: string) {
    const [total, pending, paid, failed, favorites] = await Promise.all([
      prisma.letter.count({ where: { userId } }),
      prisma.letter.count({ where: { userId, paymentStatus: PaymentStatus.PENDING } }),
      prisma.letter.count({ where: { userId, paymentStatus: PaymentStatus.PAID } }),
      prisma.letter.count({ where: { userId, paymentStatus: PaymentStatus.FAILED } }),
      prisma.letter.count({ where: { userId, isFavorite: true } }),
    ])

    return { total, pending, paid, failed, favorites }
  }
}
