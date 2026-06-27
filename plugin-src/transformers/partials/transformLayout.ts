import {
  translateGridCells,
  translateGridTracks,
  translateLayoutAlignContent,
  translateLayoutAlignItems,
  translateLayoutFlexDir,
  translateLayoutGap,
  translateLayoutGridDir,
  translateLayoutItemAlignSelf,
  translateLayoutJustifyContent,
  translateLayoutJustifyItems,
  translateLayoutMode,
  translateLayoutPadding,
  translateLayoutPaddingType,
  translateLayoutSizing,
  translateLayoutWrapType
} from '@plugin/translators';

import type { LayoutAttributes, LayoutChildAttributes } from '@ui/lib/types/shapes/layout';

// MasterGo uses flexMode instead of layoutMode, mainAxisSizingMode instead of layoutSizingHorizontal
export const transformAutoLayout = (node: any): LayoutAttributes => {
  const layout = translateLayoutMode(node.flexMode ?? node.layoutMode ?? 'NONE');

  if (layout === undefined) {
    return {};
  }

  const commonAttributes: LayoutAttributes = {
    layout,
    layoutGap: translateLayoutGap(node),
    layoutGapType: 'multiple',
    layoutPadding: translateLayoutPadding(node),
    layoutPaddingType: translateLayoutPaddingType(node),
    layoutJustifyContent: translateLayoutJustifyContent(node),
    layoutJustifyItems: translateLayoutJustifyItems(node),
    layoutAlignContent: translateLayoutAlignContent(node),
    layoutAlignItems: translateLayoutAlignItems(node)
  };

  if (layout === 'flex') {
    return {
      ...commonAttributes,
      layoutFlexDir: translateLayoutFlexDir(node.flexMode ?? node.layoutMode),
      layoutWrapType: translateLayoutWrapType(node)
    };
  }

  return commonAttributes;
};

// MasterGo uses mainAxisSizingMode / crossAxisSizingMode instead of layoutSizingHorizontal/Vertical
export const transformLayoutAttributes = (
  node: any,
  isFrame: boolean = false,
  isText: boolean = false
): Pick<
  LayoutChildAttributes,
  | 'layoutItemH-Sizing'
  | 'layoutItemV-Sizing'
  | 'layoutItemAlignSelf'
  | 'layoutItemAbsolute'
  | 'layoutItemMaxH'
  | 'layoutItemMinH'
  | 'layoutItemMaxW'
  | 'layoutItemMinW'
> => {
  const hSizing = node.mainAxisSizingMode ?? node.layoutSizingHorizontal ?? 'FIXED';
  const vSizing = node.crossAxisSizingMode ?? node.layoutSizingVertical ?? 'FIXED';

  return {
    'layoutItemH-Sizing': translateLayoutSizing(hSizing, isFrame, isText),
    'layoutItemV-Sizing': translateLayoutSizing(vSizing, isFrame, isText),
    'layoutItemAlignSelf': translateLayoutItemAlignSelf(node.layoutAlign ?? 'INHERIT'),
    'layoutItemAbsolute': node.layoutPositioning === 'ABSOLUTE',
    'layoutItemMaxH': node.maxHeight ?? undefined,
    'layoutItemMinH': node.minHeight ?? undefined,
    'layoutItemMaxW': node.maxWidth ?? undefined,
    'layoutItemMinW': node.minWidth ?? undefined
  };
};
