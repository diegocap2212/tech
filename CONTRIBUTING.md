# Como trabalhar neste repositório

Vale para o Diego, para o Tiago e para agentes de IA. As regras são as mesmas para os três — a única diferença é que o agente também precisa ler o `CLAUDE.md`, que é onde está o posicionamento e o que não se pode escrever.

## A regra que a máquina cobra

**`main` é produção.** Push nela publica em `celeretech.com.br` em cerca de 35 segundos, sem revisão de ninguém.

Por isso a `main` está protegida: **push direto está bloqueado para todo mundo, administrador incluído.** Não é convenção que se possa esquecer — o GitHub recusa. Toda mudança entra por Pull Request.

## O ciclo

```bash
# 1. Abre uma frente de trabalho (pasta e branch próprios, a partir de origin/main)
node scripts/worktree.mjs nova conciliacao-de-cartao
cd ../tech-conciliacao-de-cartao

# 2. Trabalha, commita normalmente, e envia
git push -u origin feat/conciliacao-de-cartao

# 3. Abre o PR
gh pr create --fill

# 4. Depois que entrar na main, devolve a pasta
cd ../tech
node scripts/worktree.mjs fim conciliacao-de-cartao
```

`node scripts/worktree.mjs lista` mostra todas as frentes abertas e o que há de solto em cada uma.

### Por que worktree e não `git checkout`

Com um checkout só, trocar de branch obriga a dar stash no que o outro deixou pela metade, e dois agentes rodando em paralelo se atropelam. Cada worktree é uma pasta com o seu próprio branch, compartilhando o mesmo histórico. Como o site não tem build nem `node_modules`, uma worktree nova já abre no navegador — custo zero.

`nova` parte **sempre de `origin/main`**, nunca do que está solto no checkout atual. Worktree que nasce de trabalho não commitado do vizinho é a origem de metade dos conflitos que ninguém entende depois.

`fim` se recusa a apagar pasta com alteração sem commit ou com commit que não está no GitHub. Se ele reclamar, ele está certo.

## Revisão

A revisão é pelo **diff do PR**. Não há preview automático: o GitHub Pages serve um branch só.

Quando a mudança é visual — espaçamento, quebra de manchete, peso de logo, comportamento no celular — o diff não mostra o que importa. Aí abra:

```bash
node scripts/servir.mjs        # http://localhost:4321
```

Sem instalar nada, sem cache. Confira em 1440 e em 390 de largura antes de aprovar.

> Já aconteceu de uma manchete quebrar em quatro linhas e deixar uma palavra órfã na última. No diff estava perfeita.

## Nomes de branch

`feat/` funcionalidade · `fix/` correção · `content/` texto e pautas do blog · `chore/` infraestrutura e configuração

O script entende o tipo direto no nome:

```bash
node scripts/worktree.mjs nova cases            # feat/cases
node scripts/worktree.mjs nova content/cases    # content/cases
node scripts/worktree.mjs nova fix/logo-torto   # fix/logo-torto
```

Sem tipo, ele assume `feat/`. A pasta se chama pelo nome, sem o tipo — `../tech-cases` nos três casos.

## O que nunca se edita à mão

| Arquivo | Por quê |
|---|---|
| `sitemap.xml` | É derivado. Rode `node scripts/build-sitemap.mjs` — ele reconstrói a partir dos próprios posts. Editar à mão dessincroniza silenciosamente. |
| Bloco `<!-- related -->` dos posts | Gerado por `node scripts/build-related.mjs`. |
| `CNAME` | É o domínio. Mexer aqui derruba o site. |
| `images/renner.png`, `dafiti.png`, `pluxee.png`, `raia-drogasil.png` | São os originais opacos, sem canal alfa. A faixa de logos usa `images/logos/`. O `CLAUDE.md` explica por quê. |

Depois de publicar post ou mexer em pauta, rode os dois geradores e commite o resultado junto:

```bash
node scripts/build-related.mjs
node scripts/build-sitemap.mjs
```

## Editou CSS? Suba a versão

As folhas são pedidas como `css/style.css?v=21`. Esse número é a **única** chave de cache do site: se ele não muda, o navegador de quem já visitou e a borda do GitHub continuam servindo a folha antiga — a sua mudança sobe para produção e ninguém vê.

```bash
node scripts/bump-css.mjs           # sobe todas as folhas em 1
node scripts/bump-css.mjs style     # sobe só a style.css
node scripts/bump-css.mjs --check   # mostra as versões e quem ficou atrasado
```

Rode antes de abrir o PR, sempre que tocar em qualquer arquivo de `css/`, e commite as páginas alteradas junto. São 21 arquivos HTML — não dá para fazer à mão sem esquecer um.

> Aconteceu: o reset de imagem foi corrigido, subiu para produção, e o retrato do fundador continuou esticado no ar porque o `?v=` não mudou.

## Fim de linha

`.gitattributes` força **LF** em tudo, inclusive na árvore de trabalho. Não desligue e não sobrescreva com configuração local: o Windows grava CRLF e o sandbox dos agentes grava LF, e sem a regra o mesmo arquivo aparece "modificado" nas duas pontas sem ninguém ter editado nada.

## Para agentes de IA

Além do que está acima:

1. **Leia o `CLAUDE.md` antes de escrever qualquer texto de venda.** Ele traz o posicionamento e três travas de escrita — palavras que não podem aparecer no site. Não invente posicionamento novo.
2. **Uma worktree por tarefa.** Nunca trabalhe no checkout principal, nunca deixe worktree órfã.
3. **Dado que você não tem, você não inventa.** Número de case, preço, nome de cliente: deixe marcado entre colchetes, como `[A PREENCHER]`, e diga no PR o que falta.
4. **Abra o PR e pare.** Merge é decisão de pessoa. Você pode ter permissão técnica para fazer o merge — não faça.
