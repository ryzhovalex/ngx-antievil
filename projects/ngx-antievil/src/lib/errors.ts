import { CoreErrorCode } from "./codes";
import { StringUtils, TranslationOptions } from "./utils";

export interface BaseErrorOptions extends ErrorOptions {
    isAlertSpawned?: boolean;
    isLogged?: boolean;
}

/**
 * Base error is a client side by default.
 */
export class BaseError extends Error
{
  public Code: string = CoreErrorCode.SystemClient;
  public IsAlertSpawned = true;
  public IsLogged = true;

  public constructor(
    message?: string,
    options?: BaseErrorOptions
  )
  {
    super(message, options);

    if (options !== undefined)
    {
      this.initOptions(options);
    }
  }

  public getCode(): string
  {
    return this.Code;
  }

  public getTranslationOptions(): TranslationOptions
  {
    return {};
  }

  protected initOptions(options: BaseErrorOptions): void
  {
    this.IsAlertSpawned = options.isAlertSpawned ?? true;
    this.IsLogged = options.isLogged ?? true;
  }
}

export class SilentError extends BaseError
{
  public override IsAlertSpawned = false;
  public override IsLogged = false;
}

export class NotFoundError extends BaseError
{
  public override Code = CoreErrorCode.NotFound;

  public constructor(title?: string, value?: string, options?: object)
  {
    let message: string =
      `${StringUtils.getTitledValue(title, value)} not found`;
    if (options !== undefined)
    {
      message += `for options: ${JSON.stringify(options)}`;
    }
    super(message);
  }
}

export class LogicError extends BaseError
{
  public override Code = CoreErrorCode.LogicError;
}

export class DuplicateNameError extends BaseError
{
  public override Code = CoreErrorCode.DuplicateName;

  private duplicatedName: string;

  public constructor(message: string, duplicatedName: string)
  {
    super(message);
    this.duplicatedName = duplicatedName;
  }

  public override getTranslationOptions(): TranslationOptions
  {
    return {
      params: {
        name: this.duplicatedName
      }
    };
  }
}

export class PleaseDefineError extends BaseError
{
  public override Code = CoreErrorCode.PleaseDefine;

  public constructor(
    cannotDo: string,
    pleaseDefine: string
  )
  {
    super(`cannot do ${cannotDo}: please define ${pleaseDefine}`);
  }
}

export class ExpectError extends BaseError {}

/**
 * Some object should have type or be instance of expected type.
 */
export class TypeExpectError extends ExpectError
{
  public override Code = CoreErrorCode.TypeExpect;

  public constructor(
    obj: object,
    expectedType: string,
    actualType: string | null = null
  )
  {
    let message: string =
      `object <${obj}> is expected to have type <${expectedType}>`;
    if (actualType !== null)
    {
      message += `: got type <${actualType}> instead`;
    }
    super(message);
  }
}

export class UnsupportedError extends BaseError
{
  public override Code = CoreErrorCode.Unsupported;

  public constructor(
    title?: string,
    value?: string
  )
  {
    super(
      [
        "unsupported value",
        StringUtils.getTitledValue(title, value)
      ].join(" ")
    );
  }
}
