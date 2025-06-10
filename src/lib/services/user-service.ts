import { prisma } from "@/lib/prisma"

export class UserService {
  static async createUser(data: {
    id: string
    email: string
    name?: string
    avatarUrl?: string
  }) {
    return await prisma.user.upsert({
      where: { id: data.id },
      update: {
        email: data.email,
        name: data.name,
        avatarUrl: data.avatarUrl,
      },
      create: data,
    })
  }

  static async getUserById(id: string) {
    return await prisma.user.findUnique({
      where: { id },
      include: {
        letters: {
          orderBy: { createdAt: "desc" },
        },
      },
    })
  }

  static async getUserByEmail(email: string) {
    return await prisma.user.findUnique({
      where: { email },
      include: {
        letters: {
          orderBy: { createdAt: "desc" },
        },
      },
    })
  }

  static async updateUser(
    id: string,
    data: {
      name?: string
      avatarUrl?: string
    },
  ) {
    return await prisma.user.update({
      where: { id },
      data,
    })
  }

  static async deleteUser(id: string) {
    return await prisma.user.delete({
      where: { id },
    })
  }
}
