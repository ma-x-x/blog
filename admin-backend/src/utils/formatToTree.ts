export function makeTree(nodes: any[], parentId: number) {
  return nodes
    .filter(node => node.parentId === parentId)
    .reduce(
      (tree, node) => [
        ...tree,
        {
          ...node,
          children: makeTree(nodes, node.id),
        },
      ],
      [],
    );
}
