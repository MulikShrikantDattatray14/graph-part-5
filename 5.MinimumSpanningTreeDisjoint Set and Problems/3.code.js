class DisjointSet {
  constructor(n) {
    this.rank = new Array(n + 1).fill(0);
    this.parent = [...Array(n + 1).keys()];
    // Array(n + 1): Creates an array with n + 1 undefined elements.
    // .keys(): Retrieves an iterator of the array keys (indices).
    // ...: The spread operator is used to spread the iterator into individual elements.
    this.size = new Array(n + 1).fill(1);
  }
  findUPar(node) {
    // find ultimate parent
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

const ds = new DisjointSet(7);
ds.unionByRank(1, 2);
ds.unionByRank(2, 3);
ds.unionByRank(4, 5);
ds.unionByRank(6, 7);
ds.unionByRank(5, 6);

// if 3 and 7 are the same or not
if (ds.findUPar(3) === ds.findUPar(7)) {
  console.log("Same");
} else {
  console.log("Not Same");
}

ds.unionByRank(3, 7);
if (ds.findUPar(3) === ds.findUPar(7)) {
  console.log("Same");
} else {
  console.log("Not Same");
}

//Time Complexity:  The actual time complexity is O(4) which is very small and close to 1. So, we can consider 4 as a constant.
