import prettier from 'prettier';

export default async function detectPrettierSemicolonPreference(
  filepath: string
): Promise<boolean | null> {
  const config = await prettier.resolveConfig(filepath);

  if (!config) {
    return null;
  }

  return config.semi ?? null;
}
