import { transformId } from '@plugin/transformers/partials';
import { generateUuid } from '@plugin/utils/generateUuid';

import type {
  GridCell,
  GridCellAlignSelf,
  GridCellJustifySelf,
  GridTrack,
  JustifyAlignContent,
  JustifyAlignItems,
  LayoutAlignSelf,
  LayoutFlexDir,
  LayoutGap,
  LayoutGridDir,
  LayoutMode,
  LayoutPadding,
  LayoutSizing,
  LayoutWrapType
} from '@ui/lib/types/shapes/layout';
import type { Uuid } from '@ui/lib/types/utils/uuid';

// MasterGo uses flexMode / mainAxisAlignItems / crossAxisAlignItems
type MasterGoLayoutSizing = 'FIXED' | 'AUTO';
type MasterGoLayoutAlign = 'FLEX_START' | 'CENTER' | 'FLEX_END' | 'STRETCH' | 'INHERIT';

export const translateLayoutMode = (
  flexMode: 'NONE' | 'HORIZONTAL' | 'VERTICAL'
): LayoutMode | undefined => {
  switch (flexMode) {
    case 'HORIZONTAL':
    case 'VERTICAL':
      return 'flex';
    default:
      return;
  }
};

export const translateLayoutFlexDir = (
  flexMode: 'NONE' | 'HORIZONTAL' | 'VERTICAL'
): LayoutFlexDir | undefined => {
  switch (flexMode) {
    case 'HORIZONTAL':
      return 'row-reverse';
    case 'VERTICAL':
      return 'column-reverse';
    default:
      return;
  }
};

export const translateLayoutGap = (node: any): LayoutGap | undefined => {
  if (node.flexMode === 'NONE') return;

  const mainAxisSpacing =
    node.mainAxisAlignItems === 'SPACING_BETWEEN' ? 0 : node.itemSpacing;

  const crossAxisSpacing =
    node.flexWrap === 'WRAP'
      ? node.crossAxisAlignContent === 'SPACE_BETWEEN'
        ? 0
        : (node.crossAxisSpacing ?? undefined)
      : 0;

  if (node.flexMode === 'HORIZONTAL') {
    return {
      rowGap: crossAxisSpacing,
      columnGap: mainAxisSpacing
    };
  }

  if (node.flexMode === 'VERTICAL') {
    return {
      rowGap: mainAxisSpacing,
      columnGap: crossAxisSpacing
    };
  }
};

export const translateLayoutWrapType = (node: any): LayoutWrapType | undefined => {
  if (node.flexMode !== 'HORIZONTAL') {
    return;
  }

  switch (node.flexWrap) {
    case 'NO_WRAP':
      return 'nowrap';
    case 'WRAP':
      return 'wrap';
  }
};

export const translateLayoutPadding = (node: any): LayoutPadding => {
  let p1 = node.paddingTop;
  let p2 = node.paddingRight;
  let p3 = node.paddingBottom;
  let p4 = node.paddingLeft;

  if (node.height > 0 && node.height === p1 + p3) {
    p1 = p1 - 0.0001;
    p3 = p3 - 0.0001;
  }

  if (node.width > 0 && node.width === p2 + p4) {
    p2 = p2 - 0.0001;
    p4 = p4 - 0.0001;
  }

  return { p1, p2, p3, p4 };
};

export const translateLayoutPaddingType = (node: any): 'simple' | 'multiple' => {
  if (node.paddingTop === node.paddingBottom && node.paddingRight === node.paddingLeft) {
    return 'simple';
  }
  return 'multiple';
};

export const translateLayoutJustifyContent = (node: any): JustifyAlignContent => {
  switch (node.mainAxisAlignItems) {
    case 'FLEX_START':
      return 'start';
    case 'CENTER':
      return 'center';
    case 'FLEX_END':
      return 'end';
    case 'SPACING_BETWEEN':
      return 'space-between';
  }
};

export const translateLayoutJustifyItems = (node: any): JustifyAlignItems => {
  switch (node.mainAxisAlignItems) {
    case 'FLEX_START':
      return 'start';
    case 'CENTER':
      return 'center';
    case 'FLEX_END':
      return 'end';
    default:
      return 'stretch';
  }
};

export const translateLayoutAlignContent = (node: any): JustifyAlignContent => {
  if (node.crossAxisAlignContent === 'SPACE_BETWEEN') {
    return 'space-between';
  }

  switch (node.crossAxisAlignItems) {
    case 'FLEX_START':
      return 'start';
    case 'CENTER':
      return 'center';
    case 'FLEX_END':
      return 'end';
    default:
      return 'stretch';
  }
};

export const translateLayoutAlignItems = (node: any): JustifyAlignItems => {
  switch (node.crossAxisAlignItems) {
    case 'FLEX_START':
      return 'start';
    case 'CENTER':
      return 'center';
    case 'FLEX_END':
      return 'end';
    default:
      return 'stretch';
  }
};

export const translateLayoutSizing = (
  sizing: MasterGoLayoutSizing,
  isFrame: boolean = false,
  isText: boolean = false
): LayoutSizing => {
  switch (sizing) {
    case 'FIXED':
      return 'fix';
    case 'AUTO':
      return isText ? 'fix' : 'auto';
  }
};

export const translateLayoutItemAlignSelf = (align: MasterGoLayoutAlign): LayoutAlignSelf => {
  switch (align) {
    case 'FLEX_START':
      return 'start';
    case 'CENTER':
      return 'center';
    case 'FLEX_END':
      return 'end';
    default:
      return 'stretch';
  }
};
