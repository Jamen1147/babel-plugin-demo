// from - obj?.prop
// to - obj == null ? void 0 : obj.prop

const template = require('@babel/template').default;

module.exports = function optionalChainingPlugin(babel) {
  return {
    name: 'optional-chaining-plugin',
    visitor: {
      OptionalMemberExpression(path, state) {
        path.replaceWith(
          babel.types.conditionalExpression(
            babel.types.binaryExpression(
              "==",
              babel.types.identifier(path.node.object.name),
              babel.types.nullLiteral()
            ),
            template.expression('void 0')(),
            babel.types.memberExpression(
              babel.types.identifier(path.node.object.name),
              babel.types.identifier(path.node.property.name)
            )
          )
        )
      }
    }
  }
}