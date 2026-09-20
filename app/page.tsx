import { Workspace } from "@/components/Workspace";
import { DEFAULT_MODEL } from "@/lib/config";
import { getEnabledProviders, isAuthEnabled } from "@/lib/supabase/config";
import { getUser } from "@/lib/supabase/server";

export default async function Home() {
  const [user, providers] = await Promise.all([getUser(), getEnabledProviders()]);
  return (
    <Workspace
      defaultModel={DEFAULT_MODEL}
      authEnabled={isAuthEnabled}
      providers={providers}
      user={
        user
          ? {
              email: user.email ?? "Signed in",
              avatarUrl: (user.user_metadata?.avatar_url as string | undefined) ?? null,
            }
          : null
      }
    />
  );
}
