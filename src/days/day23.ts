type Computer = string;
type LanNode = {
    computer: Computer;
    connections: Set<Computer>;
}

export function part1(input: string): string {
    const nodes = input.split("\n").slice(0, -1)
        .map(edge => {
            return edge.split("-");
        })
        .reduce((nodes, edge) => {
            const [a, b] = edge;

            let nodeA = nodes.get(a);
            if (nodeA === undefined) {
                nodeA = {
                    computer: a,
                    connections: new Set(),
                };
                nodes.set(a, nodeA);
            }

            let nodeB = nodes.get(b);
            if (nodeB === undefined) {
                nodeB = {
                    computer: b,
                    connections: new Set(),
                };
                nodes.set(b, nodeB);
            }

            nodeA.connections.add(b);
            nodeB.connections.add(a);

            return nodes;
        }, new Map<Computer, LanNode>());

    const triples = new Set<`${Computer},${Computer},${Computer}`>();
    for (const nodeA of nodes.values()) {
        nodeA.connections.forEach(nodeBName => {
            const nodeB = nodes.get(nodeBName)!;
            nodeB.connections.forEach(nodeCName => {
                const nodeC = nodes.get(nodeCName)!;
                nodeC.connections.forEach(nodeD => {
                    if (nodeD === nodeA.computer) {
                        const nodes = [nodeA.computer, nodeB.computer, nodeC.computer];
                        if (!nodes.some(node => node.startsWith("t"))) {
                            return;
                        }
                        const [x, y, z] = [nodeA.computer, nodeB.computer, nodeC.computer].sort();
                        triples.add(`${x},${y},${z}`);
                    }
                });
            })
        });
    }

    return triples.size.toString();
}

export function part2(input: string): string {
    return ":3";
}
