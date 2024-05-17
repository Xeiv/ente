import type { ClusterFacesResult } from "services/face/cluster";
import { Dimensions } from "services/face/geom";
import { EnteFile } from "types/file";
import { Box, Point } from "./geom";

export interface MLSyncResult {
    nOutOfSyncFiles: number;
    nSyncedFiles: number;
    nSyncedFaces: number;
    nFaceClusters: number;
    nFaceNoise: number;
    error?: Error;
}

export declare type FaceDescriptor = Float32Array;

export declare type Cluster = Array<number>;

export interface FacesCluster {
    faces: Cluster;
    summary?: FaceDescriptor;
}

export interface FacesClustersWithNoise {
    clusters: Array<FacesCluster>;
    noise: Cluster;
}

export interface NearestCluster {
    cluster: FacesCluster;
    distance: number;
}

export declare type Landmark = Point;

export declare type ImageType = "Original" | "Preview";

export declare type FaceDetectionMethod = "YoloFace";

export declare type FaceCropMethod = "ArcFace";

export declare type FaceAlignmentMethod = "ArcFace";

export declare type FaceEmbeddingMethod = "MobileFaceNet";

export declare type BlurDetectionMethod = "Laplacian";

export declare type ClusteringMethod = "Hdbscan" | "Dbscan";

export class AlignedBox {
    box: Box;
    rotation: number;
}

export interface Versioned<T> {
    value: T;
    version: number;
}

export interface FaceDetection {
    // box and landmarks is relative to image dimentions stored at mlFileData
    box: Box;
    landmarks?: Array<Landmark>;
    probability?: number;
}

export interface DetectedFace {
    fileId: number;
    detection: FaceDetection;
}

export interface DetectedFaceWithId extends DetectedFace {
    id: string;
}

export interface FaceCrop {
    image: ImageBitmap;
    // imageBox is relative to image dimentions stored at mlFileData
    imageBox: Box;
}

export interface StoredFaceCrop {
    cacheKey: string;
    imageBox: Box;
}

export interface CroppedFace extends DetectedFaceWithId {
    crop?: StoredFaceCrop;
}

export interface FaceAlignment {
    // TODO: remove affine matrix as rotation, size and center
    // are simple to store and use, affine matrix adds complexity while getting crop
    affineMatrix: Array<Array<number>>;
    rotation: number;
    // size and center is relative to image dimentions stored at mlFileData
    size: number;
    center: Point;
}

export interface AlignedFace extends CroppedFace {
    alignment?: FaceAlignment;
    blurValue?: number;
}

export declare type FaceEmbedding = Float32Array;

export interface FaceWithEmbedding extends AlignedFace {
    embedding?: FaceEmbedding;
}

export interface Face extends FaceWithEmbedding {
    personId?: number;
}

export interface Person {
    id: number;
    name?: string;
    files: Array<number>;
    displayFaceId?: string;
    faceCropCacheKey?: string;
}

export interface MlFileData {
    fileId: number;
    faces?: Face[];
    imageSource?: ImageType;
    imageDimensions?: Dimensions;
    faceDetectionMethod?: Versioned<FaceDetectionMethod>;
    faceCropMethod?: Versioned<FaceCropMethod>;
    faceAlignmentMethod?: Versioned<FaceAlignmentMethod>;
    faceEmbeddingMethod?: Versioned<FaceEmbeddingMethod>;
    mlVersion: number;
    errorCount: number;
    lastErrorMessage?: string;
}

export interface MLSearchConfig {
    enabled: boolean;
}

export interface MLSyncFileContext {
    enteFile: EnteFile;
    localFile?: globalThis.File;

    oldMlFile?: MlFileData;
    newMlFile?: MlFileData;

    imageBitmap?: ImageBitmap;

    newDetection?: boolean;
    newAlignment?: boolean;
}

export interface MLLibraryData {
    faceClusteringMethod?: Versioned<ClusteringMethod>;
    faceClusteringResults?: ClusterFacesResult;
    faceClustersWithNoise?: FacesClustersWithNoise;
}

export declare type MLIndex = "files" | "people";