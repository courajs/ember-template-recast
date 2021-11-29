import { builders, parse, print, transform } from '.';
import type { ASTv1 as AST } from '@glimmer/syntax';



function replaceThing(node: AST.Node, from: string, to: string): void {
}

describe('thingy', function () {
    test('Escape string literals when changing quote type', function () {
      let ast = parse(`{{helper "aaron's house"}}`) as any;
      ast.body[0].params[0].quoteType = "'";
      expect(print(ast)).toEqual(`{{helper 'aaron\\'s house'}}`);

      ast = parse(`{{helper '"so-called"'}}`);
      ast.body[0].params[0].quoteType = '"';
      expect(print(ast)).toEqual(`{{helper '\\"so-called\\"'}}`);
    });

    test('Escape attribute values when changing quote type', function () {
      let ast = parse(`<img alt="john's house">`) as any;
      ast.body[0].attributes[0].quoteType = "'";
      expect(print(ast)).toEqual(`<img alt='john\\'s house'>`);

      ast = parse(`<img alt='"so-called"'>`);
      ast.body[0].attributes[0].quoteType = '"';
      expect(print(ast)).toEqual(`<img alt="\\"so-called\\"">`);

      ast = parse(`<div class="john's house {{this.otherClass}}"></div>`);
      ast.body[0].attributes[0].quoteType = "'";
      expect(print(ast)).toEqual(`<div class='john&apos;s house {{this.otherClass}}"></div>`);

      ast = parse(`<div class='a "so-called" btn {{this.otherClass}}'></div>`);
      ast.body[0].attributes[0].quoteType = '"';
      expect(print(ast)).toEqual(`<div class="a &quot;so-called&quot; btn {{this.otherClass}}"></div>`);
    });
});
