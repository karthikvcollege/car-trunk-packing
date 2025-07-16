// utils/packer.js

export class OptimizedPacker {
  constructor(binWidth, binHeight, binDepth) {
    this.binWidth = binWidth;
    this.binHeight = binHeight;
    this.binDepth = binDepth;
    this.placedItems = [];
    this.occupiedSpaces = [];
  }

  generateOrientations([l, w, h]) {
    return [
      [l, w, h], [l, h, w], [w, l, h],
      [w, h, l], [h, l, w], [h, w, l]
    ];
  }

  canPlaceAt(x, y, z, w, h, d) {
    if (x + w > this.binWidth || y + h > this.binHeight || z + d > this.binDepth) return false;
    for (const box of this.occupiedSpaces) {
      if (!(x + w <= box.x || x >= box.x + box.w ||
            y + h <= box.y || y >= box.y + box.h ||
            z + d <= box.z || z >= box.z + box.d)) {
        return false;
      }
    }
    return true;
  }

 hasSupport(x, y, z, w, d) {
  if (y === 0) return true;

  const requiredSupportArea = w * d * 0.75;
  let supportedArea = 0;

  for (const box of this.occupiedSpaces) {
    const overlapX = Math.max(0, Math.min(x + w, box.x + box.w) - Math.max(x, box.x));
    const overlapZ = Math.max(0, Math.min(z + d, box.z + box.d) - Math.max(z, box.z));
    const heightMatch = Math.abs(box.y + box.h - y) < 0.1;

    if (heightMatch && overlapX > 0 && overlapZ > 0) {
      supportedArea += overlapX * overlapZ;
      if (supportedArea >= requiredSupportArea) return true;
    }
  }
  return false;
}


  getHighestY() {
    return this.occupiedSpaces.length === 0 ? 0 : Math.max(...this.occupiedSpaces.map(b => b.y + b.h));
  }

  isInRearViewZone(x, y, z, w, h, d) {
    const midX = this.binWidth / 2;
    const midZ = this.binDepth / 2;
    const rearViewZone = {
      x: midX - 5, w: 10, // 10" wide zone in the center
      y: this.binHeight - 5, h: 5, // Top 5"
      z: midZ - 5, d: 10 // 10" deep zone
    };
    return !(x + w <= rearViewZone.x || x >= rearViewZone.x + rearViewZone.w ||
             y + h <= rearViewZone.y || y >= rearViewZone.y + rearViewZone.h ||
             z + d <= rearViewZone.z || z >= rearViewZone.z + rearViewZone.d);
  }

  findBestPlacement(w, h, d, isFragile, isFrequent) {
    let best = null;
    let bestScore = Infinity;
    const yStart = isFragile ? this.getHighestY() : 0;
    const yEnd = this.binHeight - h;

    for (let y = yStart; y <= yEnd; y += 0.5) {
      for (let z = 0; z <= this.binDepth - d; z += 0.5) {
        for (let x = 0; x <= this.binWidth - w; x += 0.5) {
          if (!this.canPlaceAt(x, y, z, w, h, d)) continue;
          if (this.isInRearViewZone(x, y, z, w, h, d)) continue;
          if ((isFragile || isFrequent) && !this.hasSupport(x, y, z, w, d)) continue;

          let score = x + z + y;
          if (isFragile) score -= 10;
          if (isFrequent) score -= 5;
          if (this.hasSupport(x, y, z, w, d)) score -= 3;

          if (score < bestScore) {
            bestScore = score;
            best = { x, y, z };
          }
        }
      }
    }
    return best;
  }

  findBestOrientation(item) {
    const orientations = this.generateOrientations(item.size);
    let bestCombo = null;
    let bestScore = -Infinity;

    for (const [w, h, d] of orientations) {
      const pos = this.findBestPlacement(w, h, d, item.fragile, item.frequent);
      if (!pos) continue;

      const stability = this.hasSupport(pos.x, pos.y, pos.z, w, d) ? 1 : 0;
      const score = (item.weight || 1) * stability - pos.y; // heavier items go lower

      if (score > bestScore) {
        bestScore = score;
        bestCombo = { orientation: [w, h, d], position: pos };
      }
    }
    return bestCombo;
  }

  packItems(items) {
    const prioritySorted = [...items].sort((a, b) => {
      const fragA = a.fragile ? 2 : a.frequent ? 1 : 0;
      const fragB = b.fragile ? 2 : b.frequent ? 1 : 0;
      if (fragA !== fragB) return fragA - fragB;
      return (b.weight || 1) - (a.weight || 1);
    });

    const packed = [];
    for (const item of prioritySorted) {
      const combo = this.findBestOrientation(item);
      if (!combo) continue;

      const [w, h, d] = combo.orientation;
      const { x, y, z } = combo.position;

      const packedItem = {
        ...item,
        dims: [w, h, d],
        pos: [x, y, z],
        color: item.color || '#ccc'
      };
      packed.push(packedItem);
      this.placedItems.push(packedItem);
      this.occupiedSpaces.push({ x, y, z, w, h, d });
    }
    return packed;
  }

  getPackingEfficiency() {
    const used = this.placedItems.reduce((acc, i) => acc + i.dims[0] * i.dims[1] * i.dims[2], 0);
    return (used / (this.binWidth * this.binHeight * this.binDepth)) * 100;
  }
}
