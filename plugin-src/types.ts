/**
 * MasterGo Plugin API type definitions
 *
 * MasterGo's plugin API is largely compatible with Figma's, but uses `mg`
 * as the global namespace instead of `figma`. This file declares the global
 * `mg` object and its types so TypeScript doesn't complain.
 */

// MasterGo node type constants
export const MG_NODE_TYPES = {
  DOCUMENT: 'DOCUMENT',
  PAGE: 'PAGE',
  FRAME: 'FRAME',
  GROUP: 'GROUP',
  RECTANGLE: 'RECTANGLE',
  ELLIPSE: 'ELLIPSE',
  POLYGON: 'POLYGON',
  STAR: 'STAR',
  LINE: 'LINE',
  TEXT: 'TEXT',
  BOOLEAN_OPERATION: 'BOOLEAN_OPERATION',
  COMPONENT: 'COMPONENT',
  COMPONENT_SET: 'COMPONENT_SET',
  INSTANCE: 'INSTANCE',
  SECTION: 'SECTION',
  SLICE: 'SLICE',
  CONNECTOR: 'CONNECTOR',
  PEN: 'PEN'
} as const;

// ── Minimal type stubs so the plugin-src compiles without @figma/plugin-typings ──

type MessageEventHandler = (message: any) => void;

type BlendMode =
  | 'NORMAL'
  | 'DARKEN'
  | 'MULTIPLY'
  | 'COLOR_BURN'
  | 'LINEAR_BURN'
  | 'LIGHTEN'
  | 'SCREEN'
  | 'COLOR_DODGE'
  | 'LINEAR_DODGE'
  | 'OVERLAY'
  | 'SOFT_LIGHT'
  | 'HARD_LIGHT'
  | 'DIFFERENCE'
  | 'EXCLUSION'
  | 'HUE'
  | 'SATURATION'
  | 'COLOR'
  | 'LUMINOSITY';

type StrokeCap =
  | 'NONE'
  | 'ROUND'
  | 'SQUARE'
  | 'ARROW_LINES'
  | 'ARROW_EQUILATERAL'
  | 'DIAMOND_FILLED'
  | 'CIRCLE_FILLED'
  | 'TRIANGLE_FILLED'
  | 'WASHI_TAPE_1'
  | 'WASHI_TAPE_2'
  | 'WASHI_TAPE_3'
  | 'WASHI_TAPE_4'
  | 'WASHI_TAPE_5'
  | 'WASHI_TAPE_6';

type ConnectorStrokeCap =
  | 'NONE'
  | 'ARROW_EQUILATERAL'
  | 'DIAMOND_FILLED'
  | 'CIRCLE_FILLED'
  | 'TRIANGLE_FILLED';

type StrokeAlign = 'CENTER' | 'INSIDE' | 'OUTSIDE';

type PaintType =
  | 'SOLID'
  | 'GRADIENT_LINEAR'
  | 'GRADIENT_RADIAL'
  | 'GRADIENT_ANGULAR'
  | 'GRADIENT_DIAMOND'
  | 'IMAGE'
  | 'VIDEO';

interface Color {
  readonly r: number;
  readonly g: number;
  readonly b: number;
  readonly a?: number;
}

interface VariableAlias {
  type: 'VARIABLE_ALIAS';
  id: string;
}

interface Image {
  readonly hash: string;
  getBytesAsync(): Promise<Uint8Array>;
}

interface FontName {
  family: string;
  style: string;
}

interface Font {
  fontName: FontName;
}

interface SolidPaint {
  readonly type: 'SOLID';
  color: Color;
  visible?: boolean;
  opacity?: number;
  blendMode?: BlendMode;
  boundVariables?: { color?: VariableAlias };
}

interface GradientPaint {
  readonly type:
    | 'GRADIENT_LINEAR'
    | 'GRADIENT_RADIAL'
    | 'GRADIENT_ANGULAR'
    | 'GRADIENT_DIAMOND';
  readonly gradientStops: ReadonlyArray<{ color: Color; position: number }>;
  readonly gradientTransform?: readonly [readonly [number, number, number], readonly [number, number, number]];
  visible?: boolean;
  opacity?: number;
  blendMode?: BlendMode;
}

interface ImagePaint {
  readonly type: 'IMAGE';
  readonly imageHash: string | null;
  readonly scaleMode: 'FILL' | 'FIT' | 'CROP' | 'TILE';
  readonly imageTransform?: readonly [readonly [number, number, number], readonly [number, number, number]];
  visible?: boolean;
  opacity?: number;
  blendMode?: BlendMode;
}

type Paint = SolidPaint | GradientPaint | ImagePaint;

interface VectorPath {
  readonly windingRule: 'NONZERO' | 'EVENODD' | 'NONE';
  readonly data: string;
}

interface VectorVertex {
  readonly x: number;
  readonly y: number;
  readonly strokeCap: StrokeCap | ConnectorStrokeCap;
}

interface VectorRegion {
  readonly windingRule: 'NONZERO' | 'EVENODD' | 'NONE';
  readonly loops: ReadonlyArray<ReadonlyArray<number>>;
  readonly fills?: readonly Paint[];
}

interface Rect {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
}

interface BaseStyleMixin {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  remote: boolean;
}

interface BaseStyle extends BaseStyleMixin {
  readonly type: string;
}

interface PaintStyle extends BaseStyle {
  readonly type: 'PAINT';
  readonly paints: readonly Paint[];
}

interface TextStyle extends BaseStyle {
  readonly type: 'TEXT';
  readonly fontSize: number;
  readonly fontName: FontName;
  readonly textDecoration: 'NONE' | 'UNDERLINE' | 'STRIKETHROUGH';
  readonly textCase: 'ORIGINAL' | 'UPPER' | 'LOWER' | 'TITLE';
  readonly lineHeight: { readonly value: number; readonly unit: string } | { readonly unit: 'AUTO' };
  readonly letterSpacing: { readonly value: number; readonly unit: string };
}

interface EffectStyle extends BaseStyle {
  readonly type: 'EFFECT';
}

interface LayoutMixin {
  readonly layoutMode: 'NONE' | 'HORIZONTAL' | 'VERTICAL';
  readonly primaryAxisAlignItems: 'MIN' | 'MAX' | 'CENTER' | 'SPACE_BETWEEN';
  readonly counterAxisAlignItems: 'MIN' | 'MAX' | 'CENTER';
  readonly paddingLeft: number;
  readonly paddingRight: number;
  readonly paddingTop: number;
  readonly paddingBottom: number;
  readonly itemSpacing: number;
  readonly layoutSizingHorizontal: 'FIXED' | 'HUG' | 'FILL';
  readonly layoutSizingVertical: 'FIXED' | 'HUG' | 'FILL';
}

interface BlendMixin {
  opacity: number;
  blendMode: BlendMode;
  isMask: boolean;
  effects: readonly Effect[];
}

interface GeometryMixin {
  fills: readonly Paint[] | typeof mg.mixed;
  strokes: readonly Paint[];
  strokeWeight: number | typeof mg.mixed;
  strokeAlign: StrokeAlign;
  strokeCap: StrokeCap;
  strokeJoin: 'MITER' | 'BEVEL' | 'ROUND';
  dashPattern: readonly number[];
  fillStyleId: string | typeof mg.mixed;
  strokeStyleId: string;
  effectStyleId: string;
}

interface CornerMixin {
  cornerRadius: number | typeof mg.mixed;
}

interface RectangleCornerMixin {
  topLeftRadius: number;
  topRightRadius: number;
  bottomRightRadius: number;
  bottomLeftRadius: number;
}

interface IndividualStrokesMixin {
  strokeTopWeight: number;
  strokeRightWeight: number;
  strokeBottomWeight: number;
  strokeLeftWeight: number;
}

interface MinimalStrokesMixin {
  strokes: readonly Paint[];
  strokeWeight: number | typeof mg.mixed;
  strokeAlign: StrokeAlign;
  dashPattern: readonly number[];
}

interface MinimalFillsMixin {
  fills: readonly Paint[] | typeof mg.mixed;
  fillStyleId: string | typeof mg.mixed;
}

interface ConstraintMixin {
  constraints: { horizontal: string; vertical: string };
}

interface DimensionMixin {
  width: number;
  height: number;
}

interface LayoutGridMixin {
  readonly layoutGrids: readonly LayoutGrid[];
}

interface GridChildrenMixin {
  readonly gridChildImplicitRow: 'AUTO' | number;
  readonly gridChildImplicitColumn: 'AUTO' | number;
  readonly gridColumnStart: number;
  readonly gridColumnEnd: number;
  readonly gridRowStart: number;
  readonly gridRowEnd: number;
}

interface TransformMixin {
  readonly absoluteTransform: readonly [readonly [number, number, number], readonly [number, number, number]];
}

interface ProportionMixin {
  readonly relativeTransform: readonly [readonly [number, number, number], readonly [number, number, number]];
  rotation: number;
  scaleX: number;
  scaleY: number;
}

interface ExportMixin {
  readonly absoluteBoundingBox: Rect | null;
}

interface FrameBlendMixin extends BlendMixin {
  clipsContent: boolean;
}

interface VectorLikeMixin extends GeometryMixin, CornerMixin {
  vectorPaths: readonly VectorPath[];
  handleMirroring: 'NONE' | 'ANGLE' | 'VERTEX';
}

interface ParagraphMixin {
  textAlignHorizontal: 'LEFT' | 'CENTER' | 'RIGHT' | 'JUSTIFIED';
  textAlignVertical: 'TOP' | 'CENTER' | 'BOTTOM';
  textAutoResize: 'NONE' | 'WIDTH_AND_HEIGHT' | 'HEIGHT' | 'TRUNCATE';
  textAutoTruncate: boolean;
  autoRename: boolean;
  textStyleId: string;
}

interface Effect {
  readonly type: string;
  readonly visible: boolean;
  readonly radius: number;
  readonly color: Color;
  readonly blendMode: BlendMode;
  readonly offset: { readonly x: number; readonly y: number };
  readonly spread: number;
}

interface LayoutGrid {
  readonly pattern: 'COLUMNS' | 'ROWS' | 'GRID';
  readonly alignment: 'MIN' | 'MAX' | 'CENTER' | 'STRETCH';
  readonly gutterSize: number;
  readonly count: number;
  readonly sectionSize: number;
  readonly visible: boolean;
  readonly color: Color;
}

interface Variable {
  readonly id: string;
  readonly name: string;
  readonly valuesByMode: { [modeId: string]: any };
  readonly resolvedType: string;
}

interface VariableCollection {
  readonly id: string;
  readonly name: string;
  readonly defaultModeId: string;
  readonly modes: readonly { modeId: string; name: string }[];
  readonly variableIds: readonly string[];
}

interface SceneNode {
  readonly id: string;
  readonly name: string;
  readonly type: string;
  readonly visible: boolean;
  readonly opacity: number;
  readonly rotation: number;
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
  readonly parent: SceneNode | null;
  readonly children: readonly SceneNode[];
  readonly fills: readonly Paint[] | typeof mg.mixed;
  readonly strokes: readonly Paint[];
  readonly strokeWeight: number | typeof mg.mixed;
  readonly strokeAlign: StrokeAlign;
  readonly dashPattern: readonly number[];
  readonly effects: readonly Effect[];
  readonly cornerRadius: number | typeof mg.mixed;
  readonly blendMode: BlendMode;
  readonly isMask: boolean;
  readonly clipsContent: boolean;
  readonly absoluteBoundingBox: Rect | null;
  readonly absoluteTransform: readonly [readonly [number, number, number], readonly [number, number, number]];
  readonly relativeTransform: readonly [readonly [number, number, number], readonly [number, number, number]];
  readonly constraints: { horizontal: string; vertical: string };
  readonly layoutGrids: readonly LayoutGrid[];
  readonly vectorPaths: readonly VectorPath[];
  readonly fillStyleId: string | typeof mg.mixed;
  readonly strokeStyleId: string;
  readonly effectStyleId: string;
  readonly boundVariables: { [key: string]: VariableAlias | VariableAlias[] } | undefined;
  readonly componentPropertyReferences: { [key: string]: string } | undefined;
  loadAsync(): Promise<void>;
  setPluginData(key: string, value: string): void;
  getPluginData(key: string): string;
  getPublishStatusAsync(): Promise<string>;
  exportAsync(options: {
    format: 'SVG_STRING' | 'PNG';
    svgOutlineText?: boolean;
    svgIdAttribute?: boolean;
  }): Promise<string | Uint8Array>;
}

interface DocumentNode {
  readonly name: string;
  readonly type: 'DOCUMENT';
  readonly children: readonly PageNode[];
}

interface PageNode extends SceneNode {
  readonly type: 'PAGE';
}

interface FrameNode extends SceneNode, FrameBlendMixin, LayoutMixin, LayoutGridMixin, GridChildrenMixin, TransformMixin, ProportionMixin, ConstraintMixin, DimensionMixin, CornerMixin, ExportMixin {
  readonly type: 'FRAME';
  readonly topLeftRadius: number;
  readonly topRightRadius: number;
  readonly bottomRightRadius: number;
  readonly bottomLeftRadius: number;
}

interface SectionNode extends SceneNode {
  readonly type: 'SECTION';
}

interface SlotNode extends SceneNode {
  readonly type: 'SLOT';
}

interface GroupNode extends SceneNode, TransformMixin, ProportionMixin, ConstraintMixin, DimensionMixin, ExportMixin {
  readonly type: 'GROUP';
}

interface TextNode extends SceneNode, ParagraphMixin, TransformMixin, ProportionMixin, ConstraintMixin, DimensionMixin, ExportMixin {
  readonly type: 'TEXT';
  readonly characters: string;
  readonly styledTextSegments: readonly any[];
  readonly fontSize: number | typeof mg.mixed;
  readonly fontName: FontName | typeof mg.mixed;
  readonly fontWeight: number | typeof mg.mixed;
  readonly letterSpacing: any;
  readonly lineHeight: any;
}

interface ComponentNode extends SceneNode, FrameBlendMixin, LayoutMixin, LayoutGridMixin, GridChildrenMixin, TransformMixin, ProportionMixin, ConstraintMixin, DimensionMixin, CornerMixin, ExportMixin {
  readonly type: 'COMPONENT';
  readonly description: string;
  readonly componentPropertyDefinitions: { [key: string]: any };
  readonly topLeftRadius: number;
  readonly topRightRadius: number;
  readonly bottomRightRadius: number;
  readonly bottomLeftRadius: number;
}

interface ComponentSetNode extends SceneNode, FrameBlendMixin, LayoutMixin, TransformMixin, ProportionMixin, ConstraintMixin, DimensionMixin, CornerMixin, ExportMixin {
  readonly type: 'COMPONENT_SET';
  readonly description: string;
  readonly componentPropertyDefinitions: { [key: string]: any };
}

interface InstanceNode extends SceneNode, FrameBlendMixin, LayoutMixin, LayoutGridMixin, GridChildrenMixin, TransformMixin, ProportionMixin, ConstraintMixin, DimensionMixin, CornerMixin, ExportMixin {
  readonly type: 'INSTANCE';
  readonly mainComponent: ComponentNode | null;
  readonly componentProperties: readonly any[];
  readonly exposedInstances: readonly any[];
  readonly topLeftRadius: number;
  readonly topRightRadius: number;
  readonly bottomRightRadius: number;
  readonly bottomLeftRadius: number;
}

interface RectangleNode extends SceneNode, GeometryMixin, CornerMixin, ConstraintMixin, DimensionMixin, TransformMixin, ProportionMixin, ExportMixin {
  readonly type: 'RECTANGLE';
  readonly topLeftRadius: number;
  readonly topRightRadius: number;
  readonly bottomRightRadius: number;
  readonly bottomLeftRadius: number;
}

interface EllipseNode extends SceneNode, GeometryMixin, ConstraintMixin, DimensionMixin, TransformMixin, ProportionMixin, ExportMixin {
  readonly type: 'ELLIPSE';
}

interface PolygonNode extends SceneNode, GeometryMixin, ConstraintMixin, DimensionMixin, TransformMixin, ProportionMixin, ExportMixin {
  readonly type: 'POLYGON';
}

interface StarNode extends SceneNode, GeometryMixin, ConstraintMixin, DimensionMixin, TransformMixin, ProportionMixin, ExportMixin {
  readonly type: 'STAR';
}

interface LineNode extends SceneNode, GeometryMixin, ConstraintMixin, DimensionMixin, TransformMixin, ProportionMixin, ExportMixin {
  readonly type: 'LINE';
}

interface VectorNode extends SceneNode, GeometryMixin, VectorLikeMixin, ConstraintMixin, DimensionMixin, TransformMixin, ProportionMixin, ExportMixin {
  readonly type: 'VECTOR';
  readonly handleMirroring: 'NONE' | 'ANGLE' | 'VERTEX';
}

interface BooleanOperationNode extends SceneNode, GeometryMixin, VectorLikeMixin, ConstraintMixin, DimensionMixin, TransformMixin, ProportionMixin, ExportMixin {
  readonly type: 'BOOLEAN_OPERATION';
  readonly booleanOperation: 'UNION' | 'INTERSECT' | 'SUBTRACT' | 'EXCLUDE';
}

interface PathNode extends SceneNode {
  readonly type: 'PATH';
}

interface ShapeWithTextNode extends SceneNode, ParagraphMixin, TransformMixin, ProportionMixin, ConstraintMixin, DimensionMixin, ExportMixin {
  readonly type: 'SHAPE_WITH_TEXT';
  readonly text: { readonly characters: string };
}

interface StickyNode extends SceneNode, TransformMixin, ProportionMixin, ConstraintMixin, DimensionMixin, ExportMixin {
  readonly type: 'STICKY';
}

interface ConnectorNode extends SceneNode, TransformMixin, ProportionMixin, ConstraintMixin, DimensionMixin, ExportMixin {
  readonly type: 'CONNECTOR';
}

interface SliceNode extends SceneNode {
  readonly type: 'SLICE';
}

type NodeChangeProperty = string;

// ── Global declarations ──

declare global {
  const __html__: string;

  const mg: {
    document: DocumentNode;
    editorType: string;
    currentUser: { id: string; name: string } | null;
    teamLibrary: {
      getAvailableLibraryVariableCollectionsAsync(): Promise<
        Array<{ libraryName: string | undefined }>
      >;
    };
    variables: {
      getVariableByIdAsync(id: string): Promise<Variable | undefined>;
      getLocalVariableCollectionsAsync(): Promise<VariableCollection[]>;
    };
    showUI(html: string, options?: { themeColors?: boolean; width?: number; height?: number }): void;
    ui: {
      postMessage(message: any): void;
      onmessage: ((message: any) => void) | null;
      resize(width: number, height: number): void;
    };
    closePlugin(): void;
    getNodeById(id: string): SceneNode | null;
    createImage(data: Uint8Array): Image;
    getImageByHash(hash: string): Image | null;
    getLocalPaintStylesAsync(): Promise<PaintStyle[]>;
    getLocalTextStylesAsync(): Promise<TextStyle[]>;
    getLocalEffectStylesAsync(): Promise<EffectStyle[]>;
    getStyleByIdAsync(id: string): Promise<BaseStyle | undefined>;
    getCanvasGrid(): SceneNode[][];
    listAvailableFontsAsync(): Promise<Font[]>;
    loadFontAsync(font: FontName): Promise<void>;
    mixed: symbol;
    /**
     * MasterGo private API for exporting PNG.
     * Returns a Promise that resolves to Uint8Array.
     */
    exportPng(options: { ids: string[]; format?: string }): Promise<Uint8Array>;
    /**
     * MasterGo private API for exporting SVG.
     * Returns a Promise that resolves to Uint8Array or string depending on options.
     */
    exportSvgByLayerIds(
      ids: string[],
      options?: { format?: 'SVG' | 'SVG_STRING' }
    ): Promise<Uint8Array | string>;
  };
}

export {};
