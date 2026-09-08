import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  const userIdentifier =
    session?.user?.name ||
    (session?.user as { phone?: string })?.phone ||
    'کاربر عزیز';

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-navy via-navy-light to-navy border border-gold/30 rounded-2xl p-8 text-cream shadow-xl relative overflow-hidden">