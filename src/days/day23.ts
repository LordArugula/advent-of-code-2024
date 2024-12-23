type Computer = string;
type LanConnections = Set<Computer>;

export function part1(input: string): string {
    const nodes = input.split("\n").slice(0, -1)
        .map(edge => {
            return edge.split("-");
        })
        .reduce((nodes, edge) => {
            const [a, b] = edge;

            let nodeA = nodes.get(a);
            if (nodeA === undefined) {
                nodeA = new Set();
                nodes.set(a, nodeA);
            }

            let nodeB = nodes.get(b);
            if (nodeB === undefined) {
                nodeB = new Set();
                nodes.set(b, nodeB);
            }

            nodeA.add(b);
            nodeB.add(a);

            return nodes;
        }, new Map<Computer, LanConnections>());

    const triples = new Set<`${Computer},${Computer},${Computer}`>();
    for (const [nodeA, connectionsA] of nodes) {
        connectionsA.forEach(nodeB => {
            const connectionsB = nodes.get(nodeB)!;
            connectionsB.forEach(nodeC => {
                const connectionsC = nodes.get(nodeC)!;
                if (!connectionsC.has(nodeA)) {
                    return;
                }

                const triple = [nodeA, nodeB, nodeC];
                if (!triple.some(node => node.startsWith("t"))) {
                    return;
                }

                const [a, b, c] = triple.sort();
                triples.add(`${a},${b},${c}`);
            })
        });
    }

    return triples.size.toString();
}

export function part2(input: string): string {
    const nodes = input.split("\n").slice(0, -1)
        .map(edge => {
            return edge.split("-");
        })
        .reduce((nodes, edge) => {
            const [a, b] = edge;

            let nodeA = nodes.get(a);
            if (nodeA === undefined) {
                nodeA = new Set();
                nodes.set(a, nodeA);
            }

            let nodeB = nodes.get(b);
            if (nodeB === undefined) {
                nodeB = new Set();
                nodes.set(b, nodeB);
            }

            nodeA.add(b);
            nodeB.add(a);

            return nodes;
        }, new Map<Computer, LanConnections>());
    
    const groups = new Set<string>();
    for (const [nodeA, _] of nodes) {
        getGroups(nodeA, new Set<Computer>(), groups, nodes);
    }

    return [...groups].reduce((largest, group) => {
      if (group.length > largest.length) {
        return group;
      }
      return largest;
    }, "");
}

function getGroups(computer: Computer, group: Set<Computer>, groups: Set<string>, graph: Map<Computer, LanConnections>) {
    group.add(computer);

    const connections = graph.get(computer)!;
    for (const nodeB of connections) {
        if (group.has(nodeB)) {
            continue;
        }

        const connectionsB = graph.get(nodeB)!;

        if (connectionsB.has(computer)) {
            getGroups(nodeB, new Set<Computer>(group), groups, graph);
        }
    }

    groups.add([...group].sort().join(","));
}
