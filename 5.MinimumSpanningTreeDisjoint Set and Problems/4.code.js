class DisjointSet {
    constructor(n) {
        this.rank = new Array(n + 1).fill(0);
        this.parent = new Array(n + 1);
        this.size = new Array(n + 1).fill(1);

        for (let i = 0; i <= n; i++) {
            this.parent[i] = i;
        }
    }

    findUPar(node) {
        if (node === this.parent[node]) {
            return node;
        }
        return this.parent[node] = this.findUPar(this.parent[node]);
    }

    unionByRank(u, v) {
        let ulp_u = this.findUPar(u);
        let ulp_v = this.findUPar(v);

        if (ulp_u === ulp_v) {
            return;
        }

        if (this.rank[ulp_u] < this.rank[ulp_v]) {
            this.parent[ulp_u] = ulp_v;
        } else if (this.rank[ulp_v] < this.rank[ulp_u]) {
            this.parent[ulp_v] = ulp_u;
        } else {
            this.parent[ulp_v] = ulp_u;
            this.rank[ulp_u]++;
        }
    }
//This is as same as the Union by rank method except this method uses the size to compare the components while connecting. 
    unionBySize(u, v) {
        let ulp_u = this.findUPar(u);
        let ulp_v = this.findUPar(v);

        if (ulp_u === ulp_v) {
            return;
        }

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
ds.unionBySize(1, 2);
ds.unionBySize(2, 3);
ds.unionBySize(4, 5);
ds.unionBySize(6, 7);
ds.unionBySize(5, 6);

// Check if 3 and 7 are in the same set
if (ds.findUPar(3) === ds.findUPar(7)) {
    console.log("Same");
} else {
    console.log("Not same");
}

ds.unionBySize(3, 7);

// Check if 3 and 7 are in the same set after union
if (ds.findUPar(3) === ds.findUPar(7)) {
    console.log("Same");
} else {
    console.log("Not same");
}
