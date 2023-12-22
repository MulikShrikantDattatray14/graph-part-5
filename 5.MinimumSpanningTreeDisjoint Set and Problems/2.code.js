// let V = 5;
// let edges = [
//   [0, 1, 2],
//   [0, 3, 6],
//   [1, 2, 3],
//   [1, 3, 8],
//   [1, 4, 5],
//   [4, 2, 7],
// ];//sum=16; MST = {(0, 1), (0, 3), (1, 2), (1, 4)}
///////////////////////////////////////////////////////////////////////
let V = 5;
let edges = [
  [0, 1, 2],
  [0, 2, 1],
  [1, 2, 1],
  [2, 3, 2],
  [3, 4, 1],
  [4, 2, 2],
]; //sum=5;MST = {(0, 2), (1, 2), (2, 3), (3, 4)}
const adj = Array.from({ length: V }, () => []);
for (let i = 0; i < edges.length; i++) {
  const [u, v, w] = edges[i];
  adj[u].push([v, w]);
  adj[v].push([u, w]);
}
const sum = spanningTree(V, adj);
console.log("The sum of all the edge weights:", sum);
function spanningTree(V, adj) {
  const pq = [];
  pq.sort((a, b) => a[0] - b[0]);
  const vis = new Array(V).fill(0);
  pq.push([0, 0]); //[weight, node]
  let sum = 0;
  while (pq.length > 0) {
    const [wt, node] = pq.shift();
    if (vis[node] === 1) continue;
    vis[node] = 1;
    sum += wt;

    for (let i = 0; i < adj[node].length; i++) {
      const [adjNode, edW] = adj[node][i];
      if (vis[adjNode] === 0) {
        pq.push([edW, adjNode]);
      }
    }
    // Sort the priority queue based on weights
    pq.sort((a, b) => a[0] - b[0]);
  }
  return sum;
}
