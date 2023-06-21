import { CheckIn, Prisma } from '@prisma/client'

// criando uma interface para o repositório de check-ins
export interface CheckInsRepository {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
}
