// @flow
import { showMenu } from "devtools-launchpad";
import { copyToTheClipboard } from "../../../utils/clipboard";
import type { LocalFrame } from "./types";
import type { ContextMenuItem } from "debugger-html";
import { kebabCase } from "lodash";

function formatMenuElement(
  labelString: string,
  accesskeyString: string,
  click: Function,
  disabled: boolean = false
): ContextMenuItem {
  const label = L10N.getStr(labelString);
  const id = `node-menu-${kebabCase(label)}`;
  return {
    id,
    label,
    accesskey: L10N.getStr(accesskeyString),
    disabled,
    click
  };
}

function copySourceElement(url) {
  return formatMenuElement("copySourceUrl", "copySourceUrl.accesskey", () =>
    copyToTheClipboard(url)
  );
}

function copyStackTraceElement(copyStackTrace) {
  return formatMenuElement("copyStackTrace", "copyStackTrace.accesskey", () =>
    copyStackTrace()
  );
}

export default function FrameMenu(
  frame: LocalFrame,
  copyStackTrace: Function,
  event: SyntheticKeyboardEvent
) {
  event.stopPropagation();
  event.preventDefault();

  const menuOptions = [];

  const source = frame.source;
  if (source) {
    const copySourceUrl = copySourceElement(source.url);
    menuOptions.push(copySourceUrl);
  }

  const copyStackTraceItem = copyStackTraceElement(copyStackTrace);

  menuOptions.push(copyStackTraceItem);

  showMenu(event, menuOptions);
}