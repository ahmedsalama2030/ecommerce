import { SafeHtmlPipe } from "./SafeHtml.pipe";
import { SafeStylePipe } from "./safeStyle.pipe";

export const pipes: any[] = [SafeHtmlPipe,SafeStylePipe];
export * from "./SafeHtml.pipe";
export * from "./safeStyle.pipe";