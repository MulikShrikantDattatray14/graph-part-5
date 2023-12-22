class DisjointSet {
  constructor(n) {
    this.rank = new Array(n + 1).fill(0);
    this.parent = [...Array(n + 1).keys()];
    this.size = new Array(n + 1).fill(1);
  }

  findUPar(node) {
    if (node === this.parent[node]) {
      return node;
    }
    const ulp = this.findUPar(this.parent[node]);
    this.parent[node] = ulp;
    return this.parent[node];
  }

  unionByRank(u, v) {
    const ulp_u = this.findUPar(u);
    const ulp_v = this.findUPar(v);
    if (ulp_u === ulp_v) return;
    if (this.rank[ulp_u] < this.rank[ulp_v]) {
      this.parent[ulp_u] = ulp_v;
    } else if (this.rank[ulp_v] < this.rank[ulp_u]) {
      this.parent[ulp_v] = ulp_u;
    } else {
      this.parent[ulp_v] = ulp_u;
      const rankU = this.rank[ulp_u];
      this.rank[ulp_u] = rankU + 1;
    }
  }

  unionBySize(u, v) {
    const ulp_u = this.findUPar(u);
    const ulp_v = this.findUPar(v);
    if (ulp_u === ulp_v) return;
    if (this.size[ulp_u] < this.size[ulp_v]) {
      this.parent[ulp_u] = ulp_v;
      this.size[ulp_v] += this.size[ulp_u];
    } else {
      this.parent[ulp_v] = ulp_u;
      this.size[ulp_u] += this.size[ulp_v];
    }
  }
}

function isValid(newr, newc, n) {
  return newr >= 0 && newr < n && newc >= 0 && newc < n;
}
// const grid = [
//   [1, 1, 0, 1, 1, 0],
//   [1, 1, 0, 1, 1, 0],
//   [1, 1, 0, 1, 1, 0],
//   [0, 0, 1, 0, 0, 0],
//   [0, 0, 1, 1, 1, 0],
//   [0, 0, 1, 1, 1, 0],
// ];//20
const grid = [
  [1, 1, 0, 1, 1, 0],
  [1, 1, 0, 1, 1, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 0],
  [1, 1, 1, 1, 1, 0],
]; //11
const ans = MaxConnection(grid);
console.log("The largest group of connected 1s is of size: " + ans);
function MaxConnection(grid) {
  const n = grid.length;
  const ds = new DisjointSet(n * n);
  // Step 1- connecting components, so search for 1's and start connecting them
  for (let row = 0; row < n; row++) {
    for (let col = 0; col < n; col++) {
      if (grid[row][col] === 0) continue;
      else {
        //grid[row][col] === 1
        const dr = [-1, 0, 1, 0];
        const dc = [0, -1, 0, 1];
        for (let ind = 0; ind < 4; ind++) {
          const newr = row + dr[ind];
          const newc = col + dc[ind];
          if (
            newr >= 0 &&
            newr < n &&
            newc >= 0 &&
            newc < n &&
            grid[newr][newc] === 1
          ) {
            const nodeNo = row * n + col;
            const adjNodeNo = newr * n + newc;
            ds.unionBySize(nodeNo, adjNodeNo);
          }
        }
      }
    }
  }
  // Step 2
  const components = new Set(); // for storing the ultimate parents
  let mx = 0;
  for (let row = 0; row < n; row++) {
    for (let col = 0; col < n; col++) {
      if (grid[row][col] === 1) continue;
      else {
        const dr = [-1, 0, 1, 0];
        const dc = [0, -1, 0, 1];

        for (let ind = 0; ind < 4; ind++) {
          const newr = row + dr[ind];
          const newc = col + dc[ind];
          if (newr >= 0 && newr < n && newc >= 0 && newc < n) {
            if (grid[newr][newc] === 1) {
              components.add(ds.findUPar(newr * n + newc));
            }
          }
        }

        let sizeTotal = 0;
        for (const parent of components) {
          sizeTotal += ds.size[parent];
        }
        mx = Math.max(mx, sizeTotal + 1);
      }
    }
  }
  //console.log(components)// { 0, 3, 24 }
  // what if the entire grid is full of 1's
  for (let cellNo = 0; cellNo < n * n; cellNo++) {
    mx = Math.max(mx, ds.size[ds.findUPar(cellNo)]);
    console.log(mx)
  }
  return mx;
}
