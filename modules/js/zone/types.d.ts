interface BgaZoneConfig {
  animationManager: AnimationManager;
  itemHeight: number;
  itemWidth: number;
  itemGap?: number;
  containerId: string;
  pattern?: 'custom' | 'ellipticalFit' |  'grid' | 'horizontalFit' | 'verticalFit';
  customPattern?: (props: BgaZoneItemToCoordsProps) => OriginalZoneItemToCoordsResult;
}

interface BgaZoneItem {
  id: string;
  weight?: number;
}

interface BgaZonePlaceItem {
  id: string;
  weight?: number;
  element: string;
  from?: string;
  zIndex?: number;
}

interface BgaZoneSetupItem {
  id: string;
  weight?: number;
  element: string;
  zIndex?: number;
}

interface BgaZoneRemoveTo {
  id: string;
  to: string;
  destroy?: boolean;
}

interface BgaZoneItemToCoordsProps {
  index: number;
  containerWidth: number;
  containerHeight: number;
  itemCount: number;
}

interface PPZoneItemToCoordsResult {
  top: string; // px
  left: string; // px
  containerHeight?: number;

}

interface OriginalZoneItemToCoordsResult {
  x: number; // left ?
  y: number; // top ?
  w: number; // width?
  h: number; // height?
}
