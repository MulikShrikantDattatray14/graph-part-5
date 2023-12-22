class DisjointSet {
  constructor(n) {
    this.rank = Array(n + 1).fill(0);
    this.parent = Array.from({ length: n + 1 }, (_, i) => i);
    this.size = Array(n + 1).fill(1);
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

let V = 5;
let edges = [
  [0, 1, 2],
  [0, 3, 6],
  [1, 2, 3],
  [1, 3, 8],
  [1, 4, 5],
  [4, 2, 7],
]; //16
// const V = 5;
// const edges = [
//   [0, 1, 2],
//   [0, 2, 1],
//   [1, 2, 1],
//   [2, 3, 2],
//   [3, 4, 1],
//   [4, 2, 2],
// ];//5
const adj = Array.from({ length: V }, () => []);
for (let i = 0; i < V; i++) {
  adj[i] = [];
}
for (let i = 0; i < edges.length; i++) {
  const u = edges[i][0];
  const v = edges[i][1];
  const w = edges[i][2];

  const tmp1 = [v, w];
  const tmp2 = [u, w];

  adj[u].push(tmp1);
  adj[v].push(tmp2);
}
const ds = new DisjointSet(V);
const sortedEdges = [];
for (let i = 0; i < V; i++) {
  for (let j = 0; j < adj[i].length; j++) {
    const adjNode = adj[i][j][0];
    const wt = adj[i][j][1];
    const node = i;
    const temp = { src: i, dest: adjNode, weight: wt };
    sortedEdges.push(temp);
  }
}
sortedEdges.sort((a, b) => a.weight - b.weight);
let mstWt = 0;
for (let i = 0; i < sortedEdges.length; i++) {
  const wt = sortedEdges[i].weight;
  const u = sortedEdges[i].src;
  const v = sortedEdges[i].dest;
  if (ds.findUPar(u) !== ds.findUPar(v)) {
    mstWt += wt;
    ds.unionBySize(u, v);
  }
}
console.log("The sum of all the edge weights: " + mstWt);
