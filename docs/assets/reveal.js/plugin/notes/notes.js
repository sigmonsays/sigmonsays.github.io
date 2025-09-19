!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e="undefined"!=typeof globalThis?globalThis:e||self).RevealNotes=t()}(this,function(){"use strict";function T(){return{baseUrl:null,breaks:!1,extensions:null,gfm:!0,headerIds:!0,headerPrefix:"",highlight:null,langPrefix:"language-",mangle:!0,pedantic:!1,renderer:null,sanitize:!1,sanitizer:null,silent:!1,smartLists:!1,smartypants:!1,tokenizer:null,walkTokens:null,xhtml:!1}}let c={baseUrl:null,breaks:!1,extensions:null,gfm:!0,headerIds:!0,headerPrefix:"",highlight:null,langPrefix:"language-",mangle:!0,pedantic:!1,renderer:null,sanitize:!1,sanitizer:null,silent:!1,smartLists:!1,smartypants:!1,tokenizer:null,walkTokens:null,xhtml:!1};const R=/[&<>"']/,L=/[&<>"']/g,N=/[<>"']|&(?!#?\w+;)/,D=/[<>"']|&(?!#?\w+;)/g,z={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},v=e=>z[e];function o(e,t){if(t){if(R.test(e))return e.replace(L,v)}else if(N.test(e))return e.replace(D,v);return e}const x=/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi;function p(e){return e.replace(x,(e,t)=>"colon"===(t=t.toLowerCase())?":":"#"===t.charAt(0)?"x"===t.charAt(1)?String.fromCharCode(parseInt(t.substring(2),16)):String.fromCharCode(+t.substring(1)):"")}const F=/(^|[^[])\^/g;function s(e,t){e=e.source||e,t=t||"";const n={replace:(t,s)=>(s=(s=s.source||s).replace(F,"$1"),e=e.replace(t,s),n),getRegex:()=>new RegExp(e,t)};return n}const S=/[^\w:]/g,A=/^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;function g(e,t,n){if(e){let e;try{e=decodeURIComponent(p(n)).replace(S,"").toLowerCase()}catch{return null}if(0===e.indexOf("javascript:")||0===e.indexOf("vbscript:")||0===e.indexOf("data:"))return null}t&&!A.test(n)&&(n=function(e,t){u[" "+e]||(k.test(e)?u[" "+e]=e+"/":u[" "+e]=l(e,"/",!0)),e=u[" "+e];const n=-1===e.indexOf(":");return"//"===t.substring(0,2)?n?t:e.replace(E,"$1")+t:"/"===t.charAt(0)?n?t:e.replace(C,"$1")+t:e+t}(t,n));try{n=encodeURI(n).replace(/%25/g,"%")}catch{return null}return n}const u={},k=/^[^:]+:\/*[^/]*$/,E=/^([^:]+:)[\s\S]*$/,C=/^([^:]+:\/*[^/]*)[\s\S]*$/,d={exec:function(){}};function i(e){let t,n,s=1;for(;s<arguments.length;s++)for(n in t=arguments[s],t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e}function w(e,t){const n=e.replace(/\|/g,(e,t,n)=>{let s=!1,o=t;for(;--o>=0&&"\\"===n[o];)s=!s;return s?"|":" |"}).split(/ \|/);let s=0;if(n[0].trim()||n.shift(),n.length>0&&!n[n.length-1].trim()&&n.pop(),n.length>t)n.splice(t);else for(;n.length<t;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(/\\\|/g,"|");return n}function l(e,t,n){const o=e.length;if(0===o)return"";let s=0;for(;s<o;){const i=e.charAt(o-s-1);if(i!==t||n){if(i===t||!n)break;s++}else s++}return e.substr(0,o-s)}function y(e){e&&e.sanitize&&!e.silent&&console.warn("marked(): sanitize and sanitizer parameters are deprecated since version 0.7.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/#/USING_ADVANCED.md#options")}function j(e,t){if(t<1)return"";let n="";for(;t>1;)1&t&&(n+=e),t>>=1,e+=e;return n+e}function b(e,t,n,s){const a=t.href,r=t.title?o(t.title):null,i=e[1].replace(/\\([[\]])/g,"$1");if("!"!==e[0].charAt(0)){s.state.inLink=!0;const e={type:"link",raw:n,href:a,title:r,text:i,tokens:s.inlineTokens(i,[])};return s.state.inLink=!1,e}return{type:"image",raw:n,href:a,title:r,text:o(i)}}class m{constructor(e){this.options=e||c}space(e){const t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){const t=this.rules.block.code.exec(e);if(t){const e=t[0].replace(/^ {1,4}/gm,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?e:l(e,`
`)}}}fences(e){const t=this.rules.block.fences.exec(e);if(t){const e=t[0],n=function(e,t){const n=e.match(/^(\s+)(?:```)/);if(null===n)return t;const s=n[1];return t.split(`
`).map(e=>{const t=e.match(/^\s+/);if(null===t)return e;const[n]=t;return n.length>=s.length?e.slice(s.length):e}).join(`
`)}(e,t[3]||"");return{type:"code",raw:e,lang:t[2]?t[2].trim():t[2],text:n}}}heading(e){const t=this.rules.block.heading.exec(e);if(t){let e=t[2].trim();if(/#$/.test(e)){const t=l(e,"#");this.options.pedantic?e=t.trim():t&&!/ $/.test(t)||(e=t.trim())}const n={type:"heading",raw:t[0],depth:t[1].length,text:e,tokens:[]};return this.lexer.inline(n.text,n.tokens),n}}hr(e){const t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:t[0]}}blockquote(e){const t=this.rules.block.blockquote.exec(e);if(t){const e=t[0].replace(/^ *> ?/gm,"");return{type:"blockquote",raw:t[0],tokens:this.lexer.blockTokens(e,[]),text:e}}}list(e){let t=this.rules.block.list.exec(e);if(t){let r,m,g,o,c,u,p,s,l,d,i,f,a=t[1].trim();const h=a.length>1,n={type:"list",raw:"",ordered:h,start:h?+a.slice(0,-1):"",loose:!1,items:[]};a=h?`\\d{1,9}\\${a.slice(-1)}`:`\\${a}`,this.options.pedantic&&(a=h?a:"[*+-]");const v=new RegExp(`^( {0,3}${a})((?: [^\\n]*)?(?:\\n|$))`);for(;e&&(f=!1,t=v.exec(e))&&!this.rules.block.hr.test(e);){if(r=t[0],e=e.substring(r.length),s=t[2].split(`
`,1)[0],l=e.split(`
`,1)[0],this.options.pedantic?(o=2,i=s.trimLeft()):(o=t[2].search(/[^ ]/),o=o>4?1:o,i=s.slice(o),o+=t[1].length),u=!1,!s&&/^ *$/.test(l)&&(r+=l+`
`,e=e.substring(l.length+1),f=!0),!f){const t=new RegExp(`^ {0,${Math.min(3,o-1)}}(?:[*+-]|\\d{1,9}[.)])`);for(;e&&(d=e.split(`
`,1)[0],s=d,this.options.pedantic&&(s=s.replace(/^ {1,4}(?=( {4})*[^ ])/g,"  ")),!t.test(s));){if(s.search(/[^ ]/)>=o||!s.trim())i+=`
`+s.slice(o);else{if(u)break;i+=`
`+s}u||s.trim()||(u=!0),r+=d+`
`,e=e.substring(d.length+1)}}n.loose||(p?n.loose=!0:/\n *\n *$/.test(r)&&(p=!0)),this.options.gfm&&(m=/^\[[ xX]\] /.exec(i),m&&(g="[ ] "!==m[0],i=i.replace(/^\[[ xX]\] +/,""))),n.items.push({type:"list_item",raw:r,task:!!m,checked:g,loose:!1,text:i}),n.raw+=r}n.items[n.items.length-1].raw=r.trimRight(),n.items[n.items.length-1].text=i.trimRight(),n.raw=n.raw.trimRight();const b=n.items.length;for(c=0;c<b;c++){this.lexer.state.top=!1,n.items[c].tokens=this.lexer.blockTokens(n.items[c].text,[]);const e=n.items[c].tokens.filter(e=>"space"===e.type),t=e.every(e=>{const n=e.raw.split("");let t=0;for(const e of n)if(`
`===e&&(t+=1),t>1)return!0;return!1});!n.loose&&e.length&&t&&(n.loose=!0,n.items[c].loose=!0)}return n}}html(e){const t=this.rules.block.html.exec(e);if(t){const e={type:"html",raw:t[0],pre:!this.options.sanitizer&&("pre"===t[1]||"script"===t[1]||"style"===t[1]),text:t[0]};return this.options.sanitize&&(e.type="paragraph",e.text=this.options.sanitizer?this.options.sanitizer(t[0]):o(t[0]),e.tokens=[],this.lexer.inline(e.text,e.tokens)),e}}def(e){const t=this.rules.block.def.exec(e);if(t)return t[3]&&(t[3]=t[3].substring(1,t[3].length-1)),{type:"def",tag:t[1].toLowerCase().replace(/\s+/g," "),raw:t[0],href:t[2],title:t[3]}}table(e){const t=this.rules.block.table.exec(e);if(t){const e={type:"table",header:w(t[1]).map(e=>({text:e})),align:t[2].replace(/^ *|\| *$/g,"").split(/ *\| */),rows:t[3]&&t[3].trim()?t[3].replace(/\n[ \t]*$/,"").split(`
`):[]};if(e.header.length===e.align.length){e.raw=t[0];let n,s,i,a,o=e.align.length;for(n=0;n<o;n++)/^ *-+: *$/.test(e.align[n])?e.align[n]="right":/^ *:-+: *$/.test(e.align[n])?e.align[n]="center":/^ *:-+ *$/.test(e.align[n])?e.align[n]="left":e.align[n]=null;for(o=e.rows.length,n=0;n<o;n++)e.rows[n]=w(e.rows[n],e.header.length).map(e=>({text:e}));for(o=e.header.length,s=0;s<o;s++)e.header[s].tokens=[],this.lexer.inlineTokens(e.header[s].text,e.header[s].tokens);for(o=e.rows.length,s=0;s<o;s++)for(a=e.rows[s],i=0;i<a.length;i++)a[i].tokens=[],this.lexer.inlineTokens(a[i].text,a[i].tokens);return e}}}lheading(e){const t=this.rules.block.lheading.exec(e);if(t){const e={type:"heading",raw:t[0],depth:"="===t[2].charAt(0)?1:2,text:t[1],tokens:[]};return this.lexer.inline(e.text,e.tokens),e}}paragraph(e){const t=this.rules.block.paragraph.exec(e);if(t){const e={type:"paragraph",raw:t[0],text:`
`===t[1].charAt(t[1].length-1)?t[1].slice(0,-1):t[1],tokens:[]};return this.lexer.inline(e.text,e.tokens),e}}text(e){const t=this.rules.block.text.exec(e);if(t){const e={type:"text",raw:t[0],text:t[0],tokens:[]};return this.lexer.inline(e.text,e.tokens),e}}escape(e){const t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:o(t[1])}}tag(e){const t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&/^<a /i.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&/^<\/a>/i.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&/^<(pre|code|kbd|script)(\s|>)/i.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&/^<\/(pre|code|kbd|script)(\s|>)/i.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:this.options.sanitize?"text":"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,text:this.options.sanitize?this.options.sanitizer?this.options.sanitizer(t[0]):o(t[0]):t[0]}}link(e){const t=this.rules.inline.link.exec(e);if(t){const n=t[2].trim();if(!this.options.pedantic&&/^</.test(n)){{if(!/>$/.test(n))return;const e=l(n.slice(0,-1),"\\");if((n.length-e.length)%2==0)return}}else{const e=function(e,t){if(-1===e.indexOf(t[1]))return-1;const o=e.length;let s=0,n=0;for(;n<o;n++)if("\\"===e[n])n++;else if(e[n]===t[0])s++;else if(e[n]===t[1]&&(s--,s<0))return n;return-1}(t[2],"()");if(e>-1){const n=(0===t[0].indexOf("!")?5:4)+t[1].length+e;t[2]=t[2].substring(0,e),t[0]=t[0].substring(0,n).trim(),t[3]=""}}let e=t[2],s="";if(this.options.pedantic){const t=/^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(e);t&&(e=t[1],s=t[3])}else s=t[3]?t[3].slice(1,-1):"";return e=e.trim(),/^</.test(e)&&(e=this.options.pedantic&&!/>$/.test(n)?e.slice(1):e.slice(1,-1)),b(t,{href:e&&e.replace(this.rules.inline._escapes,"$1"),title:s&&s.replace(this.rules.inline._escapes,"$1")},t[0],this.lexer)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let e=(n[2]||n[1]).replace(/\s+/g," ");if(e=t[e.toLowerCase()],!e||!e.href){const e=n[0].charAt(0);return{type:"text",raw:e,text:e}}return b(n,e,n[0],this.lexer)}}emStrong(e,t,n=""){let s=this.rules.inline.emStrong.lDelim.exec(e);if(!s)return;if(s[3]&&n.match(/[\p{L}\p{N}]/u))return;const o=s[1]||s[2]||"";if(!o||o&&(""===n||this.rules.inline.punctuation.exec(n))){const o=s[0].length-1;let a,n,i=o,r=0;const c="*"===s[0][0]?this.rules.inline.emStrong.rDelimAst:this.rules.inline.emStrong.rDelimUnd;for(c.lastIndex=0,t=t.slice(-1*e.length+o);null!=(s=c.exec(t));){if(a=s[1]||s[2]||s[3]||s[4]||s[5]||s[6],!a)continue;if(n=a.length,s[3]||s[4]){i+=n;continue}if((s[5]||s[6])&&o%3&&!((o+n)%3)){r+=n;continue}if(i-=n,i>0)continue;if(n=Math.min(n,n+i+r),Math.min(o,n)%2){const t=e.slice(1,o+s.index+n);return{type:"em",raw:e.slice(0,o+s.index+n+1),text:t,tokens:this.lexer.inlineTokens(t,[])}}const l=e.slice(2,o+s.index+n-1);return{type:"strong",raw:e.slice(0,o+s.index+n+1),text:l,tokens:this.lexer.inlineTokens(l,[])}}}}codespan(e){const t=this.rules.inline.code.exec(e);if(t){let e=t[2].replace(/\n/g," ");const n=/[^ ]/.test(e),s=/^ /.test(e)&&/ $/.test(e);return n&&s&&(e=e.substring(1,e.length-1)),e=o(e,!0),{type:"codespan",raw:t[0],text:e}}}br(e){const t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){const t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2],[])}}autolink(e,t){const n=this.rules.inline.autolink.exec(e);if(n){let e,s;return"@"===n[2]?(e=o(this.options.mangle?t(n[1]):n[1]),s="mailto:"+e):(e=o(n[1]),s=e),{type:"link",raw:n[0],text:e,href:s,tokens:[{type:"text",raw:e,text:e}]}}}url(e,t){let n;if(n=this.rules.inline.url.exec(e)){let e,s;if("@"===n[2])e=o(this.options.mangle?t(n[0]):n[0]),s="mailto:"+e;else{let t;do t=n[0],n[0]=this.rules.inline._backpedal.exec(n[0])[0];while(t!==n[0])e=o(n[0]),s="www."===n[1]?"http://"+e:e}return{type:"link",raw:n[0],text:e,href:s,tokens:[{type:"text",raw:e,text:e}]}}}inlineText(e,t){const n=this.rules.inline.text.exec(e);if(n){let e;return e=this.lexer.state.inRawBlock?this.options.sanitize?this.options.sanitizer?this.options.sanitizer(n[0]):o(n[0]):n[0]:o(this.options.smartypants?t(n[0]):n[0]),{type:"text",raw:n[0],text:e}}}}const t={newline:/^(?: *(?:\n|$))+/,code:/^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,fences:/^ {0,3}(`{3,}(?=[^`\n]*\n)|~{3,})([^\n]*)\n(?:|([\s\S]*?)\n)(?: {0,3}\1[~`]* *(?=\n|$)|$)/,hr:/^ {0,3}((?:- *){3,}|(?:_ *){3,}|(?:\* *){3,})(?:\n+|$)/,heading:/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,blockquote:/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,list:/^( {0,3}bull)( [^\n]+?)?(?:\n|$)/,html:`^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))`,def:/^ {0,3}\[(label)\]: *(?:\n *)?<?([^\s>]+)>?(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/,table:d,lheading:/^([^\n]+)\n {0,3}(=+|-+) *(?:\n+|$)/,_paragraph:/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,text:/^[^\n]+/,_label:/(?!\s*\])(?:\\.|[^[\]\\])+/,_title:/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/};t.def=s(t.def).replace("label",t._label).replace("title",t._title).getRegex(),t.bullet=/(?:[*+-]|\d{1,9}[.)])/,t.listItemStart=s(/^( *)(bull) */).replace("bull",t.bullet).getRegex(),t.list=s(t.list).replace(/bull/g,t.bullet).replace("hr",`\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))`).replace("def",`\\n+(?=`+t.def.source+")").getRegex(),t._tag="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",t._comment=/<!--(?!-?>)[\s\S]*?(?:-->|$)/,t.html=s(t.html,"i").replace("comment",t._comment).replace("tag",t._tag).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),t.paragraph=s(t._paragraph).replace("hr",t.hr).replace("heading"," {0,3}#{1,6} ").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences",` {0,3}(?:\`{3,}(?=[^\`\\n]*\\n)|~{3,})[^\\n]*\\n`).replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html",`</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)`).replace("tag",t._tag).getRegex(),t.blockquote=s(t.blockquote).replace("paragraph",t.paragraph).getRegex(),t.normal=i({},t),t.gfm=i({},t.normal,{table:`^ *([^\\n ].*\\|.*)\\n {0,3}(?:\\| *)?(:?-+:? *(?:\\| *:?-+:? *)*)(?:\\| *)?(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)`}),t.gfm.table=s(t.gfm.table).replace("hr",t.hr).replace("heading"," {0,3}#{1,6} ").replace("blockquote"," {0,3}>").replace("code",` {4}[^\\n]`).replace("fences",` {0,3}(?:\`{3,}(?=[^\`\\n]*\\n)|~{3,})[^\\n]*\\n`).replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html",`</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)`).replace("tag",t._tag).getRegex(),t.gfm.paragraph=s(t._paragraph).replace("hr",t.hr).replace("heading"," {0,3}#{1,6} ").replace("|lheading","").replace("table",t.gfm.table).replace("blockquote"," {0,3}>").replace("fences",` {0,3}(?:\`{3,}(?=[^\`\\n]*\\n)|~{3,})[^\\n]*\\n`).replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html",`</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)`).replace("tag",t._tag).getRegex(),t.pedantic=i({},t.normal,{html:s(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",t._comment).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:d,paragraph:s(t.normal._paragraph).replace("hr",t.hr).replace("heading",` *#{1,6} *[^
]`).replace("lheading",t.lheading).replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").getRegex()});const e={escape:/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,autolink:/^<(scheme:[^\s\x00-\x1f<>]*|email)>/,url:d,tag:"^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",link:/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,reflink:/^!?\[(label)\]\[(ref)\]/,nolink:/^!?\[(ref)\](?:\[\])?/,reflinkSearch:"reflink|nolink(?!\\()",emStrong:{lDelim:/^(?:\*+(?:([punct_])|[^\s*]))|^_+(?:([punct*])|([^\s_]))/,rDelimAst:/^[^_*]*?__[^_*]*?\*[^_*]*?(?=__)|[punct_](\*+)(?=[\s]|$)|[^punct*_\s](\*+)(?=[punct_\s]|$)|[punct_\s](\*+)(?=[^punct*_\s])|[\s](\*+)(?=[punct_])|[punct_](\*+)(?=[punct_])|[^punct*_\s](\*+)(?=[^punct*_\s])/,rDelimUnd:/^[^_*]*?\*\*[^_*]*?_[^_*]*?(?=\*\*)|[punct*](_+)(?=[\s]|$)|[^punct*_\s](_+)(?=[punct*\s]|$)|[punct*\s](_+)(?=[^punct*_\s])|[\s](_+)(?=[punct*])|[punct*](_+)(?=[punct*])/},code:/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,br:/^( {2,}|\\)\n(?!\s*$)/,del:d,text:/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<![`*_]|\b_|$)|[^ ](?= {2,}\n)))/,punctuation:/^([\spunctuation])/};function M(e){return e.replace(/---/g,"—").replace(/--/g,"–").replace(/(^|[-\u2014/(\[{"\s])'/g,"$1‘").replace(/'/g,"’").replace(/(^|[-\u2014/(\[{\u2018\s])"/g,"$1“").replace(/"/g,"”").replace(/\.{3}/g,"…")}function f(e){let t,n,s="";const o=e.length;for(t=0;t<o;t++)n=e.charCodeAt(t),Math.random()>.5&&(n="x"+n.toString(16)),s+="&#"+n+";";return s}e._punctuation="!\"#$%&'()+\\-.,/:;<=>?@\\[\\]`^{|}~",e.punctuation=s(e.punctuation).replace(/punctuation/g,e._punctuation).getRegex(),e.blockSkip=/\[[^\]]*?\]\([^)]*?\)|`[^`]*?`|<[^>]*?>/g,e.escapedEmSt=/\\\*|\\_/g,e._comment=s(t._comment).replace("(?:-->|$)","-->").getRegex(),e.emStrong.lDelim=s(e.emStrong.lDelim).replace(/punct/g,e._punctuation).getRegex(),e.emStrong.rDelimAst=s(e.emStrong.rDelimAst,"g").replace(/punct/g,e._punctuation).getRegex(),e.emStrong.rDelimUnd=s(e.emStrong.rDelimUnd,"g").replace(/punct/g,e._punctuation).getRegex(),e._escapes=/\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g,e._scheme=/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/,e._email=/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/,e.autolink=s(e.autolink).replace("scheme",e._scheme).replace("email",e._email).getRegex(),e._attribute=/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/,e.tag=s(e.tag).replace("comment",e._comment).replace("attribute",e._attribute).getRegex(),e._label=/(?:\[(?:\\.|[^[\]\\])*\]|\\.|`[^`]*`|[^[\]\\`])*?/,e._href=/<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/,e._title=/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/,e.link=s(e.link).replace("label",e._label).replace("href",e._href).replace("title",e._title).getRegex(),e.reflink=s(e.reflink).replace("label",e._label).replace("ref",t._label).getRegex(),e.nolink=s(e.nolink).replace("ref",t._label).getRegex(),e.reflinkSearch=s(e.reflinkSearch,"g").replace("reflink",e.reflink).replace("nolink",e.nolink).getRegex(),e.normal=i({},e),e.pedantic=i({},e.normal,{strong:{start:/^__|\*\*/,middle:/^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,endAst:/\*\*(?!\*)/g,endUnd:/__(?!_)/g},em:{start:/^_|\*/,middle:/^()\*(?=\S)([\s\S]*?\S)\*(?!\*)|^_(?=\S)([\s\S]*?\S)_(?!_)/,endAst:/\*(?!\*)/g,endUnd:/_(?!_)/g},link:s(/^!?\[(label)\]\((.*?)\)/).replace("label",e._label).getRegex(),reflink:s(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",e._label).getRegex()}),e.gfm=i({},e.normal,{escape:s(e.escape).replace("])","~|])").getRegex(),_extended_email:/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,url:/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9-]+\.?)+[^\s<]*|^email/,_backpedal:/(?:[^?!.,:;*_~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+/=?_`{|}~-]+@)|[\s\S]*?(?:(?=[\\<![`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+/=?_`{|}~-](?=[a-zA-Z0-9.!#$%&'*+/=?_`{|}~-]+@)))/}),e.gfm.url=s(e.gfm.url,"i").replace("email",e.gfm._extended_email).getRegex(),e.breaks=i({},e.gfm,{br:s(e.br).replace("{2,}","*").getRegex(),text:s(e.gfm.text).replace("\\b_",`\\b_| {2,}\\n`).replace(/\{2,\}/g,"*").getRegex()});class r{constructor(n){this.tokens=[],this.tokens.links=Object.create(null),this.options=n||c,this.options.tokenizer=this.options.tokenizer||new m,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};const s={block:t.normal,inline:e.normal};this.options.pedantic?(s.block=t.pedantic,s.inline=e.pedantic):this.options.gfm&&(s.block=t.gfm,this.options.breaks?s.inline=e.breaks:s.inline=e.gfm),this.tokenizer.rules=s}static get rules(){return{block:t,inline:e}}static lex(e,t){return new r(t).lex(e)}static lexInline(e,t){return new r(t).inlineTokens(e)}lex(e){let t;for(e=e.replace(/\r\n|\r/g,`
`).replace(/\t/g,"    "),this.blockTokens(e,this.tokens);t=this.inlineQueue.shift();)this.inlineTokens(t.src,t.tokens);return this.tokens}blockTokens(e,t=[]){let n,s,o,i;for(this.options.pedantic&&(e=e.replace(/^ +$/gm,""));e;)if(!(this.options.extensions&&this.options.extensions.block&&this.options.extensions.block.some(s=>!!(n=s.call({lexer:this},e,t))&&(e=e.substring(n.raw.length),t.push(n),!0))))if(n=this.tokenizer.space(e))e=e.substring(n.raw.length),1===n.raw.length&&t.length>0?t[t.length-1].raw+=`
`:t.push(n);else if(n=this.tokenizer.code(e))e=e.substring(n.raw.length),s=t[t.length-1],!s||"paragraph"!==s.type&&"text"!==s.type?t.push(n):(s.raw+=`
`+n.raw,s.text+=`
`+n.text,this.inlineQueue[this.inlineQueue.length-1].src=s.text);else if(n=this.tokenizer.fences(e))e=e.substring(n.raw.length),t.push(n);else if(n=this.tokenizer.heading(e))e=e.substring(n.raw.length),t.push(n);else if(n=this.tokenizer.hr(e))e=e.substring(n.raw.length),t.push(n);else if(n=this.tokenizer.blockquote(e))e=e.substring(n.raw.length),t.push(n);else if(n=this.tokenizer.list(e))e=e.substring(n.raw.length),t.push(n);else if(n=this.tokenizer.html(e))e=e.substring(n.raw.length),t.push(n);else if(n=this.tokenizer.def(e))e=e.substring(n.raw.length),s=t[t.length-1],!s||"paragraph"!==s.type&&"text"!==s.type?this.tokens.links[n.tag]||(this.tokens.links[n.tag]={href:n.href,title:n.title}):(s.raw+=`
`+n.raw,s.text+=`
`+n.raw,this.inlineQueue[this.inlineQueue.length-1].src=s.text);else if(n=this.tokenizer.table(e))e=e.substring(n.raw.length),t.push(n);else if(n=this.tokenizer.lheading(e))e=e.substring(n.raw.length),t.push(n);else{if(o=e,this.options.extensions&&this.options.extensions.startBlock){let t=1/0;const s=e.slice(1);let n;this.options.extensions.startBlock.forEach(function(e){n=e.call({lexer:this},s),"number"==typeof n&&n>=0&&(t=Math.min(t,n))}),t<1/0&&t>=0&&(o=e.substring(0,t+1))}if(this.state.top&&(n=this.tokenizer.paragraph(o)))s=t[t.length-1],i&&"paragraph"===s.type?(s.raw+=`
`+n.raw,s.text+=`
`+n.text,this.inlineQueue.pop(),this.inlineQueue[this.inlineQueue.length-1].src=s.text):t.push(n),i=o.length!==e.length,e=e.substring(n.raw.length);else if(n=this.tokenizer.text(e))e=e.substring(n.raw.length),s=t[t.length-1],s&&"text"===s.type?(s.raw+=`
`+n.raw,s.text+=`
`+n.text,this.inlineQueue.pop(),this.inlineQueue[this.inlineQueue.length-1].src=s.text):t.push(n);else if(e){const t="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(t);break}throw new Error(t)}}return this.state.top=!0,t}inline(e,t){this.inlineQueue.push({src:e,tokens:t})}inlineTokens(e,t=[]){let n,s,a,i,r,c,o=e;if(this.tokens.links){const e=Object.keys(this.tokens.links);if(e.length>0)for(;null!=(i=this.tokenizer.rules.inline.reflinkSearch.exec(o));)e.includes(i[0].slice(i[0].lastIndexOf("[")+1,-1))&&(o=o.slice(0,i.index)+"["+j("a",i[0].length-2)+"]"+o.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;null!=(i=this.tokenizer.rules.inline.blockSkip.exec(o));)o=o.slice(0,i.index)+"["+j("a",i[0].length-2)+"]"+o.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);for(;null!=(i=this.tokenizer.rules.inline.escapedEmSt.exec(o));)o=o.slice(0,i.index)+"++"+o.slice(this.tokenizer.rules.inline.escapedEmSt.lastIndex);for(;e;)if(r||(c=""),r=!1,!(this.options.extensions&&this.options.extensions.inline&&this.options.extensions.inline.some(s=>!!(n=s.call({lexer:this},e,t))&&(e=e.substring(n.raw.length),t.push(n),!0))))if(n=this.tokenizer.escape(e))e=e.substring(n.raw.length),t.push(n);else if(n=this.tokenizer.tag(e))e=e.substring(n.raw.length),s=t[t.length-1],s&&"text"===n.type&&"text"===s.type?(s.raw+=n.raw,s.text+=n.text):t.push(n);else if(n=this.tokenizer.link(e))e=e.substring(n.raw.length),t.push(n);else if(n=this.tokenizer.reflink(e,this.tokens.links))e=e.substring(n.raw.length),s=t[t.length-1],s&&"text"===n.type&&"text"===s.type?(s.raw+=n.raw,s.text+=n.text):t.push(n);else if(n=this.tokenizer.emStrong(e,o,c))e=e.substring(n.raw.length),t.push(n);else if(n=this.tokenizer.codespan(e))e=e.substring(n.raw.length),t.push(n);else if(n=this.tokenizer.br(e))e=e.substring(n.raw.length),t.push(n);else if(n=this.tokenizer.del(e))e=e.substring(n.raw.length),t.push(n);else if(n=this.tokenizer.autolink(e,f))e=e.substring(n.raw.length),t.push(n);else if(this.state.inLink||!(n=this.tokenizer.url(e,f))){{if(a=e,this.options.extensions&&this.options.extensions.startInline){let t=1/0;const s=e.slice(1);let n;this.options.extensions.startInline.forEach(function(e){n=e.call({lexer:this},s),"number"==typeof n&&n>=0&&(t=Math.min(t,n))}),t<1/0&&t>=0&&(a=e.substring(0,t+1))}if(n=this.tokenizer.inlineText(a,M))e=e.substring(n.raw.length),"_"!==n.raw.slice(-1)&&(c=n.raw.slice(-1)),r=!0,s=t[t.length-1],s&&"text"===s.type?(s.raw+=n.raw,s.text+=n.text):t.push(n);else if(e){const t="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(t);break}throw new Error(t)}}}else e=e.substring(n.raw.length),t.push(n);return t}}class h{constructor(e){this.options=e||c}code(e,t,n){const s=(t||"").match(/\S*/)[0];if(this.options.highlight){const t=this.options.highlight(e,s);t!=null&&t!==e&&(n=!0,e=t)}return e=e.replace(/\n$/,"")+`
`,s?'<pre><code class="'+this.options.langPrefix+o(s,!0)+'">'+(n?e:o(e,!0))+`</code></pre>
`:"<pre><code>"+(n?e:o(e,!0))+`</code></pre>
`}blockquote(e){return`<blockquote>
`+e+`</blockquote>
`}html(e){return e}heading(e,t,n,s){return this.options.headerIds?"<h"+t+' id="'+this.options.headerPrefix+s.slug(n)+'">'+e+"</h"+t+`>
`:"<h"+t+">"+e+"</h"+t+`>
`}hr(){return this.options.xhtml?`<hr/>
`:`<hr>
`}list(e,t,n){const s=t?"ol":"ul";return"<"+s+(t&&1!==n?' start="'+n+'"':"")+`>
`+e+"</"+s+`>
`}listitem(e){return"<li>"+e+`</li>
`}checkbox(e){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox"'+(this.options.xhtml?" /":"")+"> "}paragraph(e){return"<p>"+e+`</p>
`}table(e,t){return t&&(t="<tbody>"+t+"</tbody>"),`<table>
<thead>
`+e+`</thead>
`+t+`</table>
`}tablerow(e){return`<tr>
`+e+`</tr>
`}tablecell(e,t){const n=t.header?"th":"td";return(t.align?"<"+n+' align="'+t.align+'">':"<"+n+">")+e+"</"+n+`>
`}strong(e){return"<strong>"+e+"</strong>"}em(e){return"<em>"+e+"</em>"}codespan(e){return"<code>"+e+"</code>"}br(){return this.options.xhtml?"<br/>":"<br>"}del(e){return"<del>"+e+"</del>"}link(e,t,n){if(null===(e=g(this.options.sanitize,this.options.baseUrl,e)))return n;let s='<a href="'+o(e)+'"';return t&&(s+=' title="'+t+'"'),s+=">"+n+"</a>",s}image(e,t,n){if(null===(e=g(this.options.sanitize,this.options.baseUrl,e)))return n;let s='<img src="'+e+'" alt="'+n+'"';return t&&(s+=' title="'+t+'"'),s+=this.options.xhtml?"/>":">",s}text(e){return e}}class _{strong(e){return e}em(e){return e}codespan(e){return e}del(e){return e}html(e){return e}text(e){return e}link(e,t,n){return""+n}image(e,t,n){return""+n}br(){return""}}class O{constructor(){this.seen={}}serialize(e){return e.toLowerCase().trim().replace(/<[!/a-z].*?>/gi,"").replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g,"").replace(/\s/g,"-")}getNextSafeSlug(e,t){let n=e,s=0;if(this.seen.hasOwnProperty(n)){s=this.seen[e];do s++,n=e+"-"+s;while(this.seen.hasOwnProperty(n))}return t||(this.seen[e]=s,this.seen[n]=0),n}slug(e,t={}){const n=this.serialize(e);return this.getNextSafeSlug(n,t.dryrun)}}class a{constructor(e){this.options=e||c,this.options.renderer=this.options.renderer||new h,this.renderer=this.options.renderer,this.renderer.options=this.options,this.textRenderer=new _,this.slugger=new O}static parse(e,t){return new a(t).parse(e)}static parseInline(e,t){return new a(t).parseInline(e)}parse(e,t=!0){let r,o,d,c,w,v,l,g,i,n,y,j,f,h,s,m,_,u,b,a="";const O=e.length;for(r=0;r<O;r++)if(n=e[r],this.options.extensions&&this.options.extensions.renderers&&this.options.extensions.renderers[n.type]&&(b=this.options.extensions.renderers[n.type].call({parser:this},n),!1!==b||!["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(n.type)))a+=b||"";else switch(n.type){case"space":continue;case"hr":a+=this.renderer.hr();continue;case"heading":a+=this.renderer.heading(this.parseInline(n.tokens),n.depth,p(this.parseInline(n.tokens,this.textRenderer)),this.slugger);continue;case"code":a+=this.renderer.code(n.text,n.lang,n.escaped);continue;case"table":for(g="",l="",c=n.header.length,o=0;o<c;o++)l+=this.renderer.tablecell(this.parseInline(n.header[o].tokens),{header:!0,align:n.align[o]});for(g+=this.renderer.tablerow(l),i="",c=n.rows.length,o=0;o<c;o++){for(v=n.rows[o],l="",w=v.length,d=0;d<w;d++)l+=this.renderer.tablecell(this.parseInline(v[d].tokens),{header:!1,align:n.align[d]});i+=this.renderer.tablerow(l)}a+=this.renderer.table(g,i);continue;case"blockquote":i=this.parse(n.tokens),a+=this.renderer.blockquote(i);continue;case"list":for(y=n.ordered,j=n.start,f=n.loose,c=n.items.length,i="",o=0;o<c;o++)s=n.items[o],m=s.checked,_=s.task,h="",s.task&&(u=this.renderer.checkbox(m),f?s.tokens.length>0&&"paragraph"===s.tokens[0].type?(s.tokens[0].text=u+" "+s.tokens[0].text,s.tokens[0].tokens&&s.tokens[0].tokens.length>0&&"text"===s.tokens[0].tokens[0].type&&(s.tokens[0].tokens[0].text=u+" "+s.tokens[0].tokens[0].text)):s.tokens.unshift({type:"text",text:u}):h+=u),h+=this.parse(s.tokens,f),i+=this.renderer.listitem(h,_,m);a+=this.renderer.list(i,y,j);continue;case"html":a+=this.renderer.html(n.text);continue;case"paragraph":a+=this.renderer.paragraph(this.parseInline(n.tokens));continue;case"text":for(i=n.tokens?this.parseInline(n.tokens):n.text;r+1<O&&"text"===e[r+1].type;)n=e[++r],i+=`
`+(n.tokens?this.parseInline(n.tokens):n.text);a+=t?this.renderer.paragraph(i):i;continue;default:{const e='Token with "'+n.type+'" type was not found.';if(this.options.silent)return void console.error(e);throw new Error(e)}}return a}parseInline(e,t){t=t||this.renderer;let o,n,i,s="";const a=e.length;for(o=0;o<a;o++)if(n=e[o],this.options.extensions&&this.options.extensions.renderers&&this.options.extensions.renderers[n.type]&&(i=this.options.extensions.renderers[n.type].call({parser:this},n),!1!==i||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(n.type)))s+=i||"";else switch(n.type){case"escape":case"text":s+=t.text(n.text);break;case"html":s+=t.html(n.text);break;case"link":s+=t.link(n.href,n.title,this.parseInline(n.tokens,t));break;case"image":s+=t.image(n.href,n.title,n.text);break;case"strong":s+=t.strong(this.parseInline(n.tokens,t));break;case"em":s+=t.em(this.parseInline(n.tokens,t));break;case"codespan":s+=t.codespan(n.text);break;case"br":s+=t.br();break;case"del":s+=t.del(this.parseInline(n.tokens,t));break;default:{const e='Token with "'+n.type+'" type was not found.';if(this.options.silent)return void console.error(e);throw new Error(e)}}return s}}function n(e,t,s){if(e==null)throw new Error("marked(): input parameter is undefined or null");if("string"!=typeof e)throw new Error("marked(): input parameter is of type "+Object.prototype.toString.call(e)+", string expected");if("function"==typeof t&&(s=t,t=null),y(t=i({},n.defaults,t||{})),s){const c=t.highlight;let o;try{o=r.lex(e,t)}catch(e){return s(e)}const i=function(e){let i;if(!e)try{t.walkTokens&&n.walkTokens(o,t.walkTokens),i=a.parse(o,t)}catch(t){e=t}return t.highlight=c,e?s(e):s(null,i)};if(!c||c.length<3)return i();if(delete t.highlight,!o.length)return i();let l=0;return n.walkTokens(o,function(e){"code"===e.type&&(l++,setTimeout(()=>{c(e.text,e.lang,function(t,n){if(t)return i(t);n!=null&&n!==e.text&&(e.text=n,e.escaped=!0),l--,0===l&&i()})},0))}),0[0]}try{const s=r.lex(e,t);return t.walkTokens&&n.walkTokens(s,t.walkTokens),a.parse(s,t)}catch(e){if(e.message+=`
Please report this to https://github.com/markedjs/marked.`,t.silent)return"<p>An error occurred:</p><pre>"+o(e.message+"",!0)+"</pre>";throw e}}return n.options=n.setOptions=function(e){var t;return i(n.defaults,e),t=n.defaults,c=t,n},n.getDefaults=T,n.defaults=c,n.use=function(...s){const t=i({},...s),e=n.defaults.extensions||{renderers:{},childTokens:{}};let o;s.forEach(s=>{if(s.extensions&&(o=!0,s.extensions.forEach(t=>{if(!t.name)throw new Error("extension name required");if(t.renderer){const n=e.renderers?e.renderers[t.name]:null;e.renderers[t.name]=n?function(...s){let e=t.renderer.apply(this,s);return!1===e&&(e=n.apply(this,s)),e}:t.renderer}if(t.tokenizer){if(!t.level||"block"!==t.level&&"inline"!==t.level)throw new Error("extension level must be 'block' or 'inline'");e[t.level]?e[t.level].unshift(t.tokenizer):e[t.level]=[t.tokenizer],t.start&&("block"===t.level?e.startBlock?e.startBlock.push(t.start):e.startBlock=[t.start]:"inline"===t.level&&(e.startInline?e.startInline.push(t.start):e.startInline=[t.start]))}t.childTokens&&(e.childTokens[t.name]=t.childTokens)})),s.renderer){const e=n.defaults.renderer||new h;for(const t in s.renderer){const n=e[t];e[t]=(...o)=>{let i=s.renderer[t].apply(e,o);return!1===i&&(i=n.apply(e,o)),i}}t.renderer=e}if(s.tokenizer){const e=n.defaults.tokenizer||new m;for(const t in s.tokenizer){const n=e[t];e[t]=(...o)=>{let i=s.tokenizer[t].apply(e,o);return!1===i&&(i=n.apply(e,o)),i}}t.tokenizer=e}if(s.walkTokens){const e=n.defaults.walkTokens;t.walkTokens=function(t){s.walkTokens.call(this,t),e&&e.call(this,t)}}o&&(t.extensions=e),n.setOptions(t)})},n.walkTokens=function(e,t){for(const s of e)switch(t.call(n,s),s.type){case"table":for(const e of s.header)n.walkTokens(e.tokens,t);for(const e of s.rows)for(const s of e)n.walkTokens(s.tokens,t);break;case"list":n.walkTokens(s.items,t);break;default:n.defaults.extensions&&n.defaults.extensions.childTokens&&n.defaults.extensions.childTokens[s.type]?n.defaults.extensions.childTokens[s.type].forEach(function(e){n.walkTokens(s[e],t)}):s.tokens&&n.walkTokens(s.tokens,t)}},n.parseInline=function(e,t){if(e==null)throw new Error("marked.parseInline(): input parameter is undefined or null");if("string"!=typeof e)throw new Error("marked.parseInline(): input parameter is of type "+Object.prototype.toString.call(e)+", string expected");y(t=i({},n.defaults,t||{}));try{const s=r.lexInline(e,t);return t.walkTokens&&n.walkTokens(s,t.walkTokens),a.parseInline(s,t)}catch(e){if(e.message+=`
Please report this to https://github.com/markedjs/marked.`,t.silent)return"<p>An error occurred:</p><pre>"+o(e.message+"",!0)+"</pre>";throw e}},n.Parser=a,n.parser=a.parse,n.Renderer=h,n.TextRenderer=_,n.Lexer=r,n.lexer=r.lex,n.Tokenizer=m,n.Slugger=O,n.parse=n,()=>{let i,e,t=null;function o(){if(t&&!t.closed)t.focus();else{if(t=window.open("about:blank","reveal.js - Notes","width=1100,height=700"),t.marked=n,t.document.write(`<!--
	NOTE: You need to build the notes plugin after making changes to this file.
-->
<html lang="en">
	<head>
		<meta charset="utf-8">

		<title>reveal.js - Speaker View</title>

		<style>
			body {
				font-family: Helvetica;
				font-size: 18px;
			}

			#current-slide,
			#upcoming-slide,
			#speaker-controls {
				padding: 6px;
				box-sizing: border-box;
				-moz-box-sizing: border-box;
			}

			#current-slide iframe,
			#upcoming-slide iframe {
				width: 100%;
				height: 100%;
				border: 1px solid #ddd;
			}

			#current-slide .label,
			#upcoming-slide .label {
				position: absolute;
				top: 10px;
				left: 10px;
				z-index: 2;
			}

			#connection-status {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				z-index: 20;
				padding: 30% 20% 20% 20%;
				font-size: 18px;
				color: #222;
				background: #fff;
				text-align: center;
				box-sizing: border-box;
				line-height: 1.4;
			}

			.overlay-element {
				height: 34px;
				line-height: 34px;
				padding: 0 10px;
				text-shadow: none;
				background: rgba( 220, 220, 220, 0.8 );
				color: #222;
				font-size: 14px;
			}

			.overlay-element.interactive:hover {
				background: rgba( 220, 220, 220, 1 );
			}

			#current-slide {
				position: absolute;
				width: 60%;
				height: 100%;
				top: 0;
				left: 0;
				padding-right: 0;
			}

			#upcoming-slide {
				position: absolute;
				width: 40%;
				height: 40%;
				right: 0;
				top: 0;
			}

			/* Speaker controls */
			#speaker-controls {
				position: absolute;
				top: 40%;
				right: 0;
				width: 40%;
				height: 60%;
				overflow: auto;
				font-size: 18px;
			}

				.speaker-controls-time.hidden,
				.speaker-controls-notes.hidden {
					display: none;
				}

				.speaker-controls-time .label,
				.speaker-controls-pace .label,
				.speaker-controls-notes .label {
					text-transform: uppercase;
					font-weight: normal;
					font-size: 0.66em;
					color: #666;
					margin: 0;
				}

				.speaker-controls-time, .speaker-controls-pace {
					border-bottom: 1px solid rgba( 200, 200, 200, 0.5 );
					margin-bottom: 10px;
					padding: 10px 16px;
					padding-bottom: 20px;
					cursor: pointer;
				}

				.speaker-controls-time .reset-button {
					opacity: 0;
					float: right;
					color: #666;
					text-decoration: none;
				}
				.speaker-controls-time:hover .reset-button {
					opacity: 1;
				}

				.speaker-controls-time .timer,
				.speaker-controls-time .clock {
					width: 50%;
				}

				.speaker-controls-time .timer,
				.speaker-controls-time .clock,
				.speaker-controls-time .pacing .hours-value,
				.speaker-controls-time .pacing .minutes-value,
				.speaker-controls-time .pacing .seconds-value {
					font-size: 1.9em;
				}

				.speaker-controls-time .timer {
					float: left;
				}

				.speaker-controls-time .clock {
					float: right;
					text-align: right;
				}

				.speaker-controls-time span.mute {
					opacity: 0.3;
				}

				.speaker-controls-time .pacing-title {
					margin-top: 5px;
				}

				.speaker-controls-time .pacing.ahead {
					color: blue;
				}

				.speaker-controls-time .pacing.on-track {
					color: green;
				}

				.speaker-controls-time .pacing.behind {
					color: red;
				}

				.speaker-controls-notes {
					padding: 10px 16px;
				}

				.speaker-controls-notes .value {
					margin-top: 5px;
					line-height: 1.4;
					font-size: 1.2em;
				}

			/* Layout selector */
			#speaker-layout {
				position: absolute;
				top: 10px;
				right: 10px;
				color: #222;
				z-index: 10;
			}
				#speaker-layout select {
					position: absolute;
					width: 100%;
					height: 100%;
					top: 0;
					left: 0;
					border: 0;
					box-shadow: 0;
					cursor: pointer;
					opacity: 0;

					font-size: 1em;
					background-color: transparent;

					-moz-appearance: none;
					-webkit-appearance: none;
					-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
				}

				#speaker-layout select:focus {
					outline: none;
					box-shadow: none;
				}

			.clear {
				clear: both;
			}

			/* Speaker layout: Wide */
			body[data-speaker-layout="wide"] #current-slide,
			body[data-speaker-layout="wide"] #upcoming-slide {
				width: 50%;
				height: 45%;
				padding: 6px;
			}

			body[data-speaker-layout="wide"] #current-slide {
				top: 0;
				left: 0;
			}

			body[data-speaker-layout="wide"] #upcoming-slide {
				top: 0;
				left: 50%;
			}

			body[data-speaker-layout="wide"] #speaker-controls {
				top: 45%;
				left: 0;
				width: 100%;
				height: 50%;
				font-size: 1.25em;
			}

			/* Speaker layout: Tall */
			body[data-speaker-layout="tall"] #current-slide,
			body[data-speaker-layout="tall"] #upcoming-slide {
				width: 45%;
				height: 50%;
				padding: 6px;
			}

			body[data-speaker-layout="tall"] #current-slide {
				top: 0;
				left: 0;
			}

			body[data-speaker-layout="tall"] #upcoming-slide {
				top: 50%;
				left: 0;
			}

			body[data-speaker-layout="tall"] #speaker-controls {
				padding-top: 40px;
				top: 0;
				left: 45%;
				width: 55%;
				height: 100%;
				font-size: 1.25em;
			}

			/* Speaker layout: Notes only */
			body[data-speaker-layout="notes-only"] #current-slide,
			body[data-speaker-layout="notes-only"] #upcoming-slide {
				display: none;
			}

			body[data-speaker-layout="notes-only"] #speaker-controls {
				padding-top: 40px;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				font-size: 1.25em;
			}

			@media screen and (max-width: 1080px) {
				body[data-speaker-layout="default"] #speaker-controls {
					font-size: 16px;
				}
			}

			@media screen and (max-width: 900px) {
				body[data-speaker-layout="default"] #speaker-controls {
					font-size: 14px;
				}
			}

			@media screen and (max-width: 800px) {
				body[data-speaker-layout="default"] #speaker-controls {
					font-size: 12px;
				}
			}

		</style>
	</head>

	<body>

		<div id="connection-status">Loading speaker view...</div>

		<div id="current-slide"></div>
		<div id="upcoming-slide"><span class="overlay-element label">Upcoming</span></div>
		<div id="speaker-controls">
			<div class="speaker-controls-time">
				<h4 class="label">Time <span class="reset-button">Click to Reset</span></h4>
				<div class="clock">
					<span class="clock-value">0:00 AM</span>
				</div>
				<div class="timer">
					<span class="hours-value">00</span><span class="minutes-value">:00</span><span class="seconds-value">:00</span>
				</div>
				<div class="clear"></div>

				<h4 class="label pacing-title" style="display: none">Pacing – Time to finish current slide</h4>
				<div class="pacing" style="display: none">
					<span class="hours-value">00</span><span class="minutes-value">:00</span><span class="seconds-value">:00</span>
				</div>
			</div>

			<div class="speaker-controls-notes hidden">
				<h4 class="label">Notes</h4>
				<div class="value"></div>
			</div>
		</div>
		<div id="speaker-layout" class="overlay-element interactive">
			<span class="speaker-layout-label"></span>
			<select class="speaker-layout-dropdown"></select>
		</div>

		<script>

			(function() {

				var notes,
					notesValue,
					currentState,
					currentSlide,
					upcomingSlide,
					layoutLabel,
					layoutDropdown,
					pendingCalls = {},
					lastRevealApiCallId = 0,
					connected = false

				var connectionStatus = document.querySelector( '#connection-status' );

				var SPEAKER_LAYOUTS = {
					'default': 'Default',
					'wide': 'Wide',
					'tall': 'Tall',
					'notes-only': 'Notes only'
				};

				setupLayout();

				let openerOrigin;

				try {
					openerOrigin = window.opener.location.origin;
				}
				catch ( error ) { console.warn( error ) }

				// In order to prevent XSS, the speaker view will only run if its
				// opener has the same origin as itself
				if( window.location.origin !== openerOrigin ) {
					connectionStatus.innerHTML = 'Cross origin error.<br>The speaker window can only be opened from the same origin.';
					return;
				}

				var connectionTimeout = setTimeout( function() {
					connectionStatus.innerHTML = 'Error connecting to main window.<br>Please try closing and reopening the speaker view.';
				}, 5000 );

				window.addEventListener( 'message', function( event ) {

					clearTimeout( connectionTimeout );
					connectionStatus.style.display = 'none';

					var data = JSON.parse( event.data );

					// The overview mode is only useful to the reveal.js instance
					// where navigation occurs so we don't sync it
					if( data.state ) delete data.state.overview;

					// Messages sent by the notes plugin inside of the main window
					if( data && data.namespace === 'reveal-notes' ) {
						if( data.type === 'connect' ) {
							handleConnectMessage( data );
						}
						else if( data.type === 'state' ) {
							handleStateMessage( data );
						}
						else if( data.type === 'return' ) {
							pendingCalls[data.callId](data.result);
							delete pendingCalls[data.callId];
						}
					}
					// Messages sent by the reveal.js inside of the current slide preview
					else if( data && data.namespace === 'reveal' ) {
						if( /ready/.test( data.eventName ) ) {
							// Send a message back to notify that the handshake is complete
							window.opener.postMessage( JSON.stringify({ namespace: 'reveal-notes', type: 'connected'} ), '*' );
						}
						else if( /slidechanged|fragmentshown|fragmenthidden|paused|resumed/.test( data.eventName ) && currentState !== JSON.stringify( data.state ) ) {

							dispatchStateToMainWindow( data.state );

						}
					}

				} );

				/**
				 * Updates the presentation in the main window to match the state
				 * of the presentation in the notes window.
				 */
				const dispatchStateToMainWindow = debounce(( state ) => {
					window.opener.postMessage( JSON.stringify({ method: 'setState', args: [ state ]} ), '*' );
				}, 500);

				/**
				 * Asynchronously calls the Reveal.js API of the main frame.
				 */
				function callRevealApi( methodName, methodArguments, callback ) {

					var callId = ++lastRevealApiCallId;
					pendingCalls[callId] = callback;
					window.opener.postMessage( JSON.stringify( {
						namespace: 'reveal-notes',
						type: 'call',
						callId: callId,
						methodName: methodName,
						arguments: methodArguments
					} ), '*' );

				}

				/**
				 * Called when the main window is trying to establish a
				 * connection.
				 */
				function handleConnectMessage( data ) {

					if( connected === false ) {
						connected = true;

						setupIframes( data );
						setupKeyboard();
						setupNotes();
						setupTimer();
						setupHeartbeat();
					}

				}

				/**
				 * Called when the main window sends an updated state.
				 */
				function handleStateMessage( data ) {

					// Store the most recently set state to avoid circular loops
					// applying the same state
					currentState = JSON.stringify( data.state );

					// No need for updating the notes in case of fragment changes
					if ( data.notes ) {
						notes.classList.remove( 'hidden' );
						notesValue.style.whiteSpace = data.whitespace;
						if( data.markdown ) {
							notesValue.innerHTML = marked( data.notes );
						}
						else {
							notesValue.innerHTML = data.notes;
						}
					}
					else {
						notes.classList.add( 'hidden' );
					}

					// Update the note slides
					currentSlide.contentWindow.postMessage( JSON.stringify({ method: 'setState', args: [ data.state ] }), '*' );
					upcomingSlide.contentWindow.postMessage( JSON.stringify({ method: 'setState', args: [ data.state ] }), '*' );
					upcomingSlide.contentWindow.postMessage( JSON.stringify({ method: 'next' }), '*' );

				}

				// Limit to max one state update per X ms
				handleStateMessage = debounce( handleStateMessage, 200 );

				/**
				 * Forward keyboard events to the current slide window.
				 * This enables keyboard events to work even if focus
				 * isn't set on the current slide iframe.
				 *
				 * Block F5 default handling, it reloads and disconnects
				 * the speaker notes window.
				 */
				function setupKeyboard() {

					document.addEventListener( 'keydown', function( event ) {
						if( event.keyCode === 116 || ( event.metaKey && event.keyCode === 82 ) ) {
							event.preventDefault();
							return false;
						}
						currentSlide.contentWindow.postMessage( JSON.stringify({ method: 'triggerKey', args: [ event.keyCode ] }), '*' );
					} );

				}

				/**
				 * Creates the preview iframes.
				 */
				function setupIframes( data ) {

					var params = [
						'receiver',
						'progress=false',
						'history=false',
						'transition=none',
						'autoSlide=0',
						'backgroundTransition=none'
					].join( '&' );

					var urlSeparator = /\\?/.test(data.url) ? '&' : '?';
					var hash = '#/' + data.state.indexh + '/' + data.state.indexv;
					var currentURL = data.url + urlSeparator + params + '&postMessageEvents=true' + hash;
					var upcomingURL = data.url + urlSeparator + params + '&controls=false' + hash;

					currentSlide = document.createElement( 'iframe' );
					currentSlide.setAttribute( 'width', 1280 );
					currentSlide.setAttribute( 'height', 1024 );
					currentSlide.setAttribute( 'src', currentURL );
					document.querySelector( '#current-slide' ).appendChild( currentSlide );

					upcomingSlide = document.createElement( 'iframe' );
					upcomingSlide.setAttribute( 'width', 640 );
					upcomingSlide.setAttribute( 'height', 512 );
					upcomingSlide.setAttribute( 'src', upcomingURL );
					document.querySelector( '#upcoming-slide' ).appendChild( upcomingSlide );

				}

				/**
				 * Setup the notes UI.
				 */
				function setupNotes() {

					notes = document.querySelector( '.speaker-controls-notes' );
					notesValue = document.querySelector( '.speaker-controls-notes .value' );

				}

				/**
				 * We send out a heartbeat at all times to ensure we can
				 * reconnect with the main presentation window after reloads.
				 */
				function setupHeartbeat() {

					setInterval( () => {
						window.opener.postMessage( JSON.stringify({ namespace: 'reveal-notes', type: 'heartbeat'} ), '*' );
					}, 1000 );

				}

				function getTimings( callback ) {

					callRevealApi( 'getSlidesAttributes', [], function ( slideAttributes ) {
						callRevealApi( 'getConfig', [], function ( config ) {
							var totalTime = config.totalTime;
							var minTimePerSlide = config.minimumTimePerSlide || 0;
							var defaultTiming = config.defaultTiming;
							if ((defaultTiming == null) && (totalTime == null)) {
								callback(null);
								return;
							}
							// Setting totalTime overrides defaultTiming
							if (totalTime) {
								defaultTiming = 0;
							}
							var timings = [];
							for ( var i in slideAttributes ) {
								var slide = slideAttributes[ i ];
								var timing = defaultTiming;
								if( slide.hasOwnProperty( 'data-timing' )) {
									var t = slide[ 'data-timing' ];
									timing = parseInt(t);
									if( isNaN(timing) ) {
										console.warn("Could not parse timing '" + t + "' of slide " + i + "; using default of " + defaultTiming);
										timing = defaultTiming;
									}
								}
								timings.push(timing);
							}
							if ( totalTime ) {
								// After we've allocated time to individual slides, we summarize it and
								// subtract it from the total time
								var remainingTime = totalTime - timings.reduce( function(a, b) { return a + b; }, 0 );
								// The remaining time is divided by the number of slides that have 0 seconds
								// allocated at the moment, giving the average time-per-slide on the remaining slides
								var remainingSlides = (timings.filter( function(x) { return x == 0 }) ).length
								var timePerSlide = Math.round( remainingTime / remainingSlides, 0 )
								// And now we replace every zero-value timing with that average
								timings = timings.map( function(x) { return (x==0 ? timePerSlide : x) } );
							}
							var slidesUnderMinimum = timings.filter( function(x) { return (x < minTimePerSlide) } ).length
							if ( slidesUnderMinimum ) {
								message = "The pacing time for " + slidesUnderMinimum + " slide(s) is under the configured minimum of " + minTimePerSlide + " seconds. Check the data-timing attribute on individual slides, or consider increasing the totalTime or minimumTimePerSlide configuration options (or removing some slides).";
								alert(message);
							}
							callback( timings );
						} );
					} );

				}

				/**
				 * Return the number of seconds allocated for presenting
				 * all slides up to and including this one.
				 */
				function getTimeAllocated( timings, callback ) {

					callRevealApi( 'getSlidePastCount', [], function ( currentSlide ) {
						var allocated = 0;
						for (var i in timings.slice(0, currentSlide + 1)) {
							allocated += timings[i];
						}
						callback( allocated );
					} );

				}

				/**
				 * Create the timer and clock and start updating them
				 * at an interval.
				 */
				function setupTimer() {

					var start = new Date(),
					timeEl = document.querySelector( '.speaker-controls-time' ),
					clockEl = timeEl.querySelector( '.clock-value' ),
					hoursEl = timeEl.querySelector( '.hours-value' ),
					minutesEl = timeEl.querySelector( '.minutes-value' ),
					secondsEl = timeEl.querySelector( '.seconds-value' ),
					pacingTitleEl = timeEl.querySelector( '.pacing-title' ),
					pacingEl = timeEl.querySelector( '.pacing' ),
					pacingHoursEl = pacingEl.querySelector( '.hours-value' ),
					pacingMinutesEl = pacingEl.querySelector( '.minutes-value' ),
					pacingSecondsEl = pacingEl.querySelector( '.seconds-value' );

					var timings = null;
					getTimings( function ( _timings ) {

						timings = _timings;
						if (_timings !== null) {
							pacingTitleEl.style.removeProperty('display');
							pacingEl.style.removeProperty('display');
						}

						// Update once directly
						_updateTimer();

						// Then update every second
						setInterval( _updateTimer, 1000 );

					} );


					function _resetTimer() {

						if (timings == null) {
							start = new Date();
							_updateTimer();
						}
						else {
							// Reset timer to beginning of current slide
							getTimeAllocated( timings, function ( slideEndTimingSeconds ) {
								var slideEndTiming = slideEndTimingSeconds * 1000;
								callRevealApi( 'getSlidePastCount', [], function ( currentSlide ) {
									var currentSlideTiming = timings[currentSlide] * 1000;
									var previousSlidesTiming = slideEndTiming - currentSlideTiming;
									var now = new Date();
									start = new Date(now.getTime() - previousSlidesTiming);
									_updateTimer();
								} );
							} );
						}

					}

					timeEl.addEventListener( 'click', function() {
						_resetTimer();
						return false;
					} );

					function _displayTime( hrEl, minEl, secEl, time) {

						var sign = Math.sign(time) == -1 ? "-" : "";
						time = Math.abs(Math.round(time / 1000));
						var seconds = time % 60;
						var minutes = Math.floor( time / 60 ) % 60 ;
						var hours = Math.floor( time / ( 60 * 60 )) ;
						hrEl.innerHTML = sign + zeroPadInteger( hours );
						if (hours == 0) {
							hrEl.classList.add( 'mute' );
						}
						else {
							hrEl.classList.remove( 'mute' );
						}
						minEl.innerHTML = ':' + zeroPadInteger( minutes );
						if (hours == 0 && minutes == 0) {
							minEl.classList.add( 'mute' );
						}
						else {
							minEl.classList.remove( 'mute' );
						}
						secEl.innerHTML = ':' + zeroPadInteger( seconds );
					}

					function _updateTimer() {

						var diff, hours, minutes, seconds,
						now = new Date();

						diff = now.getTime() - start.getTime();

						clockEl.innerHTML = now.toLocaleTimeString( 'en-US', { hour12: true, hour: '2-digit', minute:'2-digit' } );
						_displayTime( hoursEl, minutesEl, secondsEl, diff );
						if (timings !== null) {
							_updatePacing(diff);
						}

					}

					function _updatePacing(diff) {

						getTimeAllocated( timings, function ( slideEndTimingSeconds ) {
							var slideEndTiming = slideEndTimingSeconds * 1000;

							callRevealApi( 'getSlidePastCount', [], function ( currentSlide ) {
								var currentSlideTiming = timings[currentSlide] * 1000;
								var timeLeftCurrentSlide = slideEndTiming - diff;
								if (timeLeftCurrentSlide < 0) {
									pacingEl.className = 'pacing behind';
								}
								else if (timeLeftCurrentSlide < currentSlideTiming) {
									pacingEl.className = 'pacing on-track';
								}
								else {
									pacingEl.className = 'pacing ahead';
								}
								_displayTime( pacingHoursEl, pacingMinutesEl, pacingSecondsEl, timeLeftCurrentSlide );
							} );
						} );
					}

				}

				/**
				 * Sets up the speaker view layout and layout selector.
				 */
				function setupLayout() {

					layoutDropdown = document.querySelector( '.speaker-layout-dropdown' );
					layoutLabel = document.querySelector( '.speaker-layout-label' );

					// Render the list of available layouts
					for( var id in SPEAKER_LAYOUTS ) {
						var option = document.createElement( 'option' );
						option.setAttribute( 'value', id );
						option.textContent = SPEAKER_LAYOUTS[ id ];
						layoutDropdown.appendChild( option );
					}

					// Monitor the dropdown for changes
					layoutDropdown.addEventListener( 'change', function( event ) {

						setLayout( layoutDropdown.value );

					}, false );

					// Restore any currently persisted layout
					setLayout( getLayout() );

				}

				/**
				 * Sets a new speaker view layout. The layout is persisted
				 * in local storage.
				 */
				function setLayout( value ) {

					var title = SPEAKER_LAYOUTS[ value ];

					layoutLabel.innerHTML = 'Layout' + ( title ? ( ': ' + title ) : '' );
					layoutDropdown.value = value;

					document.body.setAttribute( 'data-speaker-layout', value );

					// Persist locally
					if( supportsLocalStorage() ) {
						window.localStorage.setItem( 'reveal-speaker-layout', value );
					}

				}

				/**
				 * Returns the ID of the most recently set speaker layout
				 * or our default layout if none has been set.
				 */
				function getLayout() {

					if( supportsLocalStorage() ) {
						var layout = window.localStorage.getItem( 'reveal-speaker-layout' );
						if( layout ) {
							return layout;
						}
					}

					// Default to the first record in the layouts hash
					for( var id in SPEAKER_LAYOUTS ) {
						return id;
					}

				}

				function supportsLocalStorage() {

					try {
						localStorage.setItem('test', 'test');
						localStorage.removeItem('test');
						return true;
					}
					catch( e ) {
						return false;
					}

				}

				function zeroPadInteger( num ) {

					var str = '00' + parseInt( num );
					return str.substring( str.length - 2 );

				}

				/**
				 * Limits the frequency at which a function can be called.
				 */
				function debounce( fn, ms ) {

					var lastTime = 0,
						timeout;

					return function() {

						var args = arguments;
						var context = this;

						clearTimeout( timeout );

						var timeSinceLastCall = Date.now() - lastTime;
						if( timeSinceLastCall > ms ) {
							fn.apply( context, args );
							lastTime = Date.now();
						}
						else {
							timeout = setTimeout( function() {
								fn.apply( context, args );
								lastTime = Date.now();
							}, ms - timeSinceLastCall );
						}

					}

				}

			})();

		<\/script>
	</body>
</html>`),!t)return void alert("Speaker view popup failed to open. Please make sure popups are allowed and reopen the speaker view.");!function(){const n=e.getConfig().url,s="string"==typeof n?n:window.location.protocol+"//"+window.location.host+window.location.pathname+window.location.search;i=setInterval(function(){t.postMessage(JSON.stringify({namespace:"reveal-notes",type:"connect",state:e.getState(),url:s}),"*")},500),window.addEventListener("message",a)}()}}function s(){let i=e.getCurrentSlide(),o=i.querySelectorAll("aside.notes"),a=i.querySelector(".current-fragment"),s={namespace:"reveal-notes",type:"state",notes:"",markdown:!1,whitespace:"normal",state:e.getState()};if(i.hasAttribute("data-notes")&&(s.notes=i.getAttribute("data-notes"),s.whitespace="pre-wrap"),a){let e=a.querySelector("aside.notes");e?(s.notes=e.innerHTML,s.markdown="string"==typeof e.getAttribute("data-markdown"),o=null):a.hasAttribute("data-notes")&&(s.notes=a.getAttribute("data-notes"),s.whitespace="pre-wrap",o=null)}o&&(s.notes=Array.from(o).map(e=>e.innerHTML).join(`
`),s.markdown=o[0]&&"string"==typeof o[0].getAttribute("data-markdown")),t.postMessage(JSON.stringify(s),"*")}function a(n){if(function(e){try{return window.location.origin===e.source.location.origin}catch{return!1}}(n)){let s=JSON.parse(n.data);s&&"reveal-notes"===s.namespace&&"connected"===s.type?(clearInterval(i),r()):s&&"reveal-notes"===s.namespace&&"call"===s.type&&function(n,s,o){let i=e[n].apply(e,s);t.postMessage(JSON.stringify({namespace:"reveal-notes",type:"return",result:i,callId:o}),"*")}(s.methodName,s.arguments,s.callId)}}function r(){e.on("slidechanged",s),e.on("fragmentshown",s),e.on("fragmenthidden",s),e.on("overviewhidden",s),e.on("overviewshown",s),e.on("paused",s),e.on("resumed",s),s()}return{id:"notes",init:function(n){e=n,/receiver/i.test(window.location.search)||(null!==window.location.search.match(/(\?|&)notes/gi)?o():window.addEventListener("message",e=>{if(!t&&"string"==typeof e.data){let s;try{s=JSON.parse(e.data)}catch{}s&&"reveal-notes"===s.namespace&&"heartbeat"===s.type&&(n=e.source,t&&!t.closed?t.focus():(t=n,window.addEventListener("message",a),r()))}var n}),e.addKeyBinding({keyCode:83,key:"S",description:"Speaker notes view"},function(){o()}))},open:o}}})