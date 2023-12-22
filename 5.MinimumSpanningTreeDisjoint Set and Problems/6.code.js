class DisjointSet {
  constructor(n) {
    this.rank = new Array(n + 1).fill(0);
    this.parent = Array.from({ length: n + 1 }, (_, i) => i);
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

const V = 9;
const edge = [
  [0, 1],
  [0, 2],
  [0, 3],
  [1, 2],
  [2, 3],
  [4, 5],
  [5, 6],
  [7, 8],
]; //2
// const V = 4;
// const M = 3;
// const edge = [
//   [0, 1],
//   [0, 2],
//   [1, 2],
// ];//1

const ds = new DisjointSet(V);
let cntExtras = 0;
const m = edge.length;

for (let i = 0; i < m; i++) {
  const u = edge[i][0];
  const v = edge[i][1];

  if (ds.findUPar(u) === ds.findUPar(v)) {
    // as both u and V have same ulimate parent , no need to connect them thus becomes extra
    cntExtras++;
  } else {
    ds.unionBySize(u, v);
  }
}

//counting the indepedent component
let cntC = 0;
for (let i = 0; i < V; i++) {
  // if node is pointing to itself , then it is a independent connected component
  if (ds.parent[i] === i) cntC++;
}

const ans = cntC - 1;
if (cntExtras >= ans) {
  console.log("The number of operations needed: " + ans);
} else {
  console.log(-1);
}
