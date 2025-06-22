import { prisma } from "@/lib/prisma";

export class UserService {
  static async createUser(data: {
    id: string;
    email: string;
    name?: string;
    avatarUrl?: string;
  }) {
    return await prisma.user.upsert({
      where: { id: data.id },
      update: {
        email: data.email,
        name: data.name,
        avatarUrl: data.avatarUrl,
      },
      create: data,
    });
  }

  static async getUserById(userId: string) {
    return await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  static async getUserByEmail(email: string) {
    return await prisma.user.findUnique({
      where: { email },
      include: {
        letters: {
          orderBy: { createdAt: "desc" },
        },
      },
    });
  }

  static async updateUser(userId: string, data: { name?: string }) {
    return await prisma.user.update({
      where: { id: userId },
      data,
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  static async deleteUser(userId: string) {
    return await prisma.user.delete({
      where: { id: userId },
    });
  }
}
