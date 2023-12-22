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
const n = 4,
  m = 5;
const operators = [
  [0, 0],
  [0, 0],
  [1, 1],
  [1, 0],
  [0, 1],
  [0, 3],
  [1, 3],
  [0, 4],
  [3, 2],
  [2, 2],
  [1, 2],
  [0, 2],
];
const ans = numOfIslands(n, m, operators);
const sz = ans.length;
for (let i = 0; i < sz; i++) {
  console.log(ans[i] + " ");
}
// function isValid(adjr, adjc, n, m) {
//   return adjr >= 0 && adjr < n && adjc >= 0 && adjc < m;
// }
function numOfIslands(n, m, operators) {
  const ds = new DisjointSet(n * m);
  const vis = [];
  for (let i = 0; i < n; i++) {
    const row = [];
    for (let j = 0; j < m; j++) {
      row.push(0);
    }
    vis.push(row);
  }

  let cnt = 0;
  const ans = [];
  const len = operators.length;
  for (let i = 0; i < len; i++) {
    const row = operators[i][0];
    const col = operators[i][1];
    if (vis[row][col] === 1) {
      ans.push(cnt);
      continue;
    }
    vis[row][col] = 1;
    cnt++;
    const dr = [-1, 0, 1, 0];
    const dc = [0, 1, 0, -1];
    for (let ind = 0; ind < 4; ind++) {
      const adjr = row + dr[ind];
      const adjc = col + dc[ind];
      if (adjr >= 0 && adjr < n && adjc >= 0 && adjc < m) {
        if (vis[adjr][adjc] === 1) {
          const nodeNo = row * m + col;
          const adjNodeNo = adjr * m + adjc;
          /// will connect the islands only if they are already not connected, so check for ultimate parents of both.
          if (ds.findUPar(nodeNo) !== ds.findUPar(adjNodeNo)) {
            cnt--;
            ds.unionBySize(nodeNo, adjNodeNo);
          }
        }
      }
    }
    ans.push(cnt);
  }
  return ans;
}
