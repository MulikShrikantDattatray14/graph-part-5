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
function maxRemove(stones, n) {
  // finding the actual size of the matrix
  let maxRow = 0;
  let maxCol = 0;
  for (let i = 0; i < n; i++) {
    maxRow = Math.max(maxRow, stones[i][0]);
    maxCol = Math.max(maxCol, stones[i][1]);
  }
  const ds = new DisjointSet(maxRow + maxCol + 1);
  // taking the nodes where stones are
  // only the  nodes that are present in the disjoin set will be there
  const stoneNodes = new Map();
  for (let i = 0; i < n; i++) {
    const nodeRow = stones[i][0];
    const nodeCol = stones[i][1] + maxRow + 1;
    ds.unionBySize(nodeRow, nodeCol);
    stoneNodes.set(nodeRow, 1);
    stoneNodes.set(nodeCol, 1);
  }
  //console.log(stoneNodes);
  let cnt = 0;
  for (const [key, value] of stoneNodes) {
    if (ds.findUPar(key) === key) {
      //total no of individual components
      cnt++;
    }
  }
  // subtract from total stones the total number of components
  return n - cnt;
}

const n = 6;
const stones = [
  [0, 0],
  [0, 2],
  [1, 3],
  [3, 1],
  [3, 2],
  [4, 3],
]; //4

// const n=6 ;
// const stones = [[0, 0],[ 0, 1], [1, 0],[1, 2],[2, 1],[2, 2]];//5

const ans = maxRemove(stones, n);
console.log("The maximum number of stones we can remove is: " + ans);
