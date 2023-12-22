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

function accountsMerge(details) {
    const n = details.length;
    const ds = new DisjointSet(n);
    const mapMailNode = new Map();

    for (let i = 0; i < n; i++) {
        for (let j = 1; j < details[i].length; j++) {
            const mail = details[i][j];
            if (!mapMailNode.has(mail)) {
                mapMailNode.set(mail, i);
            } else {
                ds.unionBySize(i, mapMailNode.get(mail));
            }
        }
    }
    const mergedMail = [];
    for (let i = 0; i < n; i++) {
        mergedMail.push([]);
    }
    for (const [mail, node] of mapMailNode.entries()) {
        const root = ds.findUPar(node);
        mergedMail[root].push(mail);
    }
    const ans = [];
    for (let i = 0; i < n; i++) {
        if (mergedMail[i].length === 0) continue;
        mergedMail[i].sort();
        const temp = [details[i][0], ...mergedMail[i]];
        ans.push(temp);
    }
    return ans;
}

const accounts = [
    ["John", "j1@com", "j2@com", "j3@com"],
    ["John", "j4@com"],
    ["Raj", "r1@com", "r2@com"],
    ["John", "j1@com", "j5@com"],
    ["Raj", "r2@com", "r3@com"],
    ["Mary", "m1@com"],
];

const result = accountsMerge(accounts);

for (const item of result) {
    console.log(`${item[0]}: ${item.slice(1).join(" ")}`);
}
