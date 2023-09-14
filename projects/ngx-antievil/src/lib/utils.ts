

export abstract class StringUtils
{
  public static getTitledValue(title?: string, value?: string): string
  {
    if (title === undefined && value === undefined)
    {
      return "";
    }

    if (title === undefined && value !== undefined)
    {
      return `<${value}>`;
    }

    if (title !== undefined && value === undefined)
    {
      return title;
    }

    if (title !== undefined && value !== undefined)
    {
      return `${title}=<${value}>`;
    }

    throw new Error("unexpected endpoint");
  }

  public static capitalize(s: string): string
  {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }
}

export enum TranslationModifier {
    Default = "default",
    Many = "many",
    Short = "short"
}

export interface TranslationOptions
{
  modifier?: TranslationModifier;
  params?: { [key: string]: unknown };
  isCapitalized?: boolean;
}
