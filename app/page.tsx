import { Workspace } from "@/components/Workspace";
import { DEFAULT_MODEL } from "@/lib/config";
import { getEnabledProviders, isAuthEnabled } from "@/lib/supabase/config";
import { getUser } from "@/lib/supabase/server";
import { TEMPLATE_CODE } from "@/lib/templateCode.generated";

export default async function Home() {
  const [user, providers] = await Promise.all([getUser(), getEnabledProviders()]);
  return (
    <Workspace
      defaultModel={DEFAULT_MODEL}
      authEnabled={isAuthEnabled}
      providers={providers}
      bakedTemplates={Object.keys(TEMPLATE_CODE)}
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
