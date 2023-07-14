import { isAfter } from 'date-fns';
import { createStorage, testStorageSupport } from 'memory-web-storage';

export const storage = testStorageSupport()
  ? window.localStorage
  : createStorage();

export interface CachedPosition {
  zoom: number;
  viewbox: {
    minX: number;
    minY: number;
  };
}

export interface CachedSource {
  sourceRawContent: string;
  date: string;
}

const POSITION_CACHE_PREFIX = `xstate_viz_position`;
const RAW_SOURCE_CACHE_PREFIX = `xstate_viz_raw_source`;
const EDITOR_THEME_CACHE_KEY = `xstate_viz_editor_theme`;

const makePositionCacheKey = (sourceID: string | null) =>
  `${POSITION_CACHE_PREFIX}|${sourceID || 'no_source'}`;

const makeRawSourceCacheKey = (sourceID: string | null) =>
  `${RAW_SOURCE_CACHE_PREFIX}|${sourceID || 'no_source'}`;


const removeSourceRawContent = (sourceID: string | null) => {
  storage.removeItem(makeRawSourceCacheKey(sourceID));
};



export const localCache = {
  removeSourceRawContent,
};
