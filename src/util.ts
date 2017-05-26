import "byots";

export function isExport(node: ts.Node): boolean {
  if (node && node.modifiers)
    for (let i = 0, k = node.modifiers.length; i < k; ++i)
      if (node.modifiers[i].kind === ts.SyntaxKind.ExportKeyword)
        return true;
  return false;
}

export function isImport(node: ts.Node): boolean {
  if (node && node.modifiers)
    for (let i = 0, k = node.modifiers.length; i < k; ++i)
      if (node.modifiers[i].kind === ts.SyntaxKind.DeclareKeyword)
        return true;
  return false;
}

export function isStatic(node: ts.Node): boolean {
  return (node.modifierFlagsCache & ts.ModifierFlags.Static) !== 0
}

export function isConst(node: ts.Node): boolean {
  return (node.flags & ts.NodeFlags.Const) !== 0;
}
