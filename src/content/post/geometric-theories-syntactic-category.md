---
title: "Syntactic Category - Categorical Semantics"
description: "First-order signatures, geometric theories, the syntactic category, and how cartesian functors give models."
publishDate: "31 October 2026"
tags: ["Math", "Category Theory", "Logic"]
---

## 0. The First-Order Signature

In the framework of mathematical logic, the **signature** is the purely syntactic bedrock upon which all logical constructions are erected. It specifies the non-logical vocabulary without imposing any axioms.

### 0.1. Definition

A **first-order signature** $\Sigma$ consists of the following data:

1.  **Sorts ($\Sigma$-Sort):** A set of _sorts_ (or types), denoted by $A, B, C, \dots$.
2.  **Function Symbols ($\Sigma$-Fun):** A set of function symbols, each equipped with a _type_ consisting of a finite non-empty list of sorts. We write:
    $$
    f : A_1 \cdots A_n \to B
    $$
    to indicate that $f$ has type $A_1, \dots, A_n, B$. If $n = 0$, $f$ is called a **constant** of sort $B$.
3.  **Relation Symbols ($\Sigma$-Rel):** A set of relation symbols, each equipped with a _type_ consisting of a finite list of sorts. We write:
    $$
    R \rightarrowtail A_1 \cdots A_n
    $$
    to indicate that $R$ has type $A_1, \dots, A_n$.

### 0.2. Diagram of a Signature

The following diagram visualizes $\Sigma$ as a labeled directed hypergraph, where sorts are nodes, functions are arrows, and relations are subobject markers.

```tikz
\usepackage{tikz-cd}

\begin{document}

\begin{tikzcd}[column sep=large, row sep=large]
    1 \arrow[r, "c"] & A \arrow[r, "f"] \arrow[d, "h"] & B \arrow[dl, "g"] \\
    R \arrow[u, hook, dashed] & C &
\end{tikzcd}

\end{document}
```

## 1. Language

Once a signature $\Sigma$ is fixed, we generate its language recursively. This language is stratified into **terms** (which denote elements) and **formulas** (which denote propositions).

### 1.1. Terms

Given a signature $\Sigma$, the **terms** of sort $A$ over $\Sigma$ are defined by the following inductive rules:

1. Every variable $x : A$ is a term of sort $A$.
2. If $c : \to A$ is a constant symbol of $\Sigma$, then $c$ is a term of sort $A$.
3. If $t_1 : A_1, \ldots, t_n : A_n$ are terms and $f : A_1 \cdots A_n \to B$ is a function symbol of $\Sigma$, then $f(t_1, \ldots, t_n)$ is a term of sort $B$.

A term is therefore an expression built from variables, constants, and function symbols. Its purpose is to **denote an element of a sort** — it represents an object of a given type within the language.

### 1.2. Formulas

**Definition.** The **formulas** over a signature $\Sigma$ are built from **atomic formulas** using the logical connectives and quantifiers. An atomic formula is either:

1. An expression $R(t_1, \ldots, t_n)$, where $R : A_1 \cdots A_n$ is a relation symbol of $\Sigma$ and each $t_i$ is a term of sort $A_i$.
2. An equality $t_1 = t_2$, where $t_1$ and $t_2$ are terms of the same sort (if equality is present in the logic).

The set of formulas is the smallest collection containing all atomic formulas and closed under:

$$
\phi \wedge \psi \quad \text{(conjunction)}
$$

$$
\phi \vee \psi \quad \text{(disjunction)}
$$

$$
\phi \Rightarrow \psi \quad \text{(implication)}
$$

$$
\neg \ \phi \quad \text{(negation)}
$$

$$
\exists x : \, \phi \quad \text{(existential quantification)}
$$

$$
\forall x : \, \phi \quad \text{(universal quantification)}
$$

### 1.3. Free Variables

For every formula $\phi$, a variable $x$ in $\phi$ is free if and only if it is not bound by any quantifier. For example, in the formula $\forall x: y \cdot x = x$, the variable $y$ is free, while the variable $x$ is bound.

### 1.4. Geometric Formulas

The **geometric formulas** are those built from atomic formulas using only:

- Finite conjunctions ($\wedge$)
- Finite disjunctions ($\vee$)
- Existential quantification ($\exists$)

They **do not** contain implication ($\Rightarrow$), negation ($\neg$), or universal quantification ($\forall$).

### 1.5. Context

**Definition.** A **context** over a signature $\Sigma$ is a finite list of variable declarations of the form:

$$
\vec{x} = (x_1 : A_1, \ldots, x_n : A_n)
$$

where each $x_i$ is a variable and each $A_i$ is a sort (type) in $\Sigma$.
**Notation.** A context is typically denoted by $\Gamma$ or $\vec{x}$. When we write $\Gamma \mid \phi$, we indicate that the formula $\phi$ has all its free variables declared in the context $\Gamma$. Similarly, $\Gamma \mid t : A$ indicates that the term $t$ is of sort $A$ and has its free variables in $\Gamma$.

### 1.6. Sequents

**Definition.** A **sequent** over a signature $\Sigma$ is an expression of the form:

$$
\phi \vdash_{\Gamma} \psi
$$

where $\Gamma$ is a finite context, and $\phi$ and $\psi$ are formulas whose free variables are contained in $\Gamma$.

The intended meaning is that $\psi$ follows from $\phi$ for variables in $\Gamma$.

A **geometric sequent** is a sequent $\phi \vdash_{\Gamma} \psi$ where both $\phi$ and $\psi$ are geometric formulas.

### 1.7. Geometric Theories

**Definition.** A **geometric theory** $\mathbb{T}$ over a signature $\Sigma$ is a set of geometric sequents over $\Sigma$ this set of sequents constitutes the <a href="https://ncatlab.org/nlab/show/axiom" class="text-accent font-bold" target="_blank" rel="noopener noreferrer">axioms</a> of the theory, and this determines it.

## 2. Group Theory

Group theory is one of the most fundamental structures in modern mathematics. The **theory of <a href="https://ncatlab.org/nlab/show/group" class="text-accent font-bold" target="_blank" rel="noopener noreferrer">groups</a>** can be presented as a **geometric theory** over a suitable first-order signature.

### 2.1. Signature of Groups

Following the definitions of geometric logic, we define the signature $\Sigma_{\text{Grp}}$ for the theory of groups as follows:

**Sorts:**

- A single sort: $G$ (the sort of group elements).

**Function Symbols:**

- A constant symbol: $e : G^{0} \to G$ (the identity element).
- A binary function symbol: $\cdot : G^{2} \to G$ (the group multiplication).
- A unary function symbol: $(-)^{-1} : G \to G$ (the inverse operation).

**Relation Symbols:**

- The equality relation $=$ is assumed to be present in the logic.

There are no additional relation symbols in the signature.

### 2.2. Group Geometric Axioms

The theory of groups is axiomatized by the following geometric sequents, all in the empty context, as these are universal statements i.e are valid for all elements in the group

**1. Associativity:**

$$
\top \vdash_{x,y,z} (x \cdot y) \cdot z = x \cdot (y \cdot z)
$$

**2. Identity element:**

$$
\top \vdash_{x} x \cdot e = x
$$

$$
\top \vdash_{x} e \cdot x = x
$$

**3. Inverse element:**

$$
\top \vdash_{x} x \cdot x^{-1} = e
$$

$$
\top \vdash_{x} x^{-1} \cdot x = e
$$

Each of these sequents is of the form $\phi \vdash_{\vec{x}} \psi$ where $\phi = \top$ and $\psi$ is an atomic equality formula, $\phi = \top$ in all these sequents again by the universal character of the axioms.

> **Note:** These axioms are **geometric** because they are built from atomic formulas (equalities) using only conjunction (implicit in the context) and universal quantification. The absence of implication ($\Rightarrow$), negation ($\neg$), and disjunction ($\vee$) at the object level ensures that the theory is geometric.

## 3. Syntactic Category

Like any other <a href="https://ncatlab.org/nlab/show/category" class="text-accent font-bold" target="_blank" rel="noopener noreferrer">category</a>, in order to give its definition we have to set up its objects, morphisms and composition.

### 3.1. Objects

The objects are the **renaming-equivalence classes** of geometric formulas-in-context $\{\vec{x} \cdot \phi\}$ over $\Sigma$.

That is, two formulas-in-context $\{\vec{x} \cdot \phi\}$ and $\{\vec{y} \cdot \psi\}$ represent the same object if they are related by **renaming (alpha-equivalence)**. This means that $\vec{y}$ is a bijective renaming of the variables $\vec{x}$, and $\psi$ is obtained from $\phi$ by replacing each variable $x_i$ with the corresponding $y_i$, following the standard capture-avoiding substitution rules for bound variables.

The notation $\{\vec{x} \cdot \phi\}$ emphasizes that the object is the equivalence class, not a particular syntactic presentation of the formula.

### 3.2. Morphisms

An arrow

$$
\{\vec{x} \cdot \phi\} \longrightarrow \{\vec{y} \cdot \psi\}
$$

(where the contexts $\vec{x}$ and $\vec{y}$ are assumed to be disjoint without loss of generality) is a $\mathbb{T}$-provable-equivalence class $[\theta]$ of a geometric formula $\theta(\vec{x}, \vec{y})$ which is **$\mathbb{T}$-provably functional**.

The equivalence class $[\theta]$ identifies two such formulas if they are provably equivalent in $\mathbb{T}$ in the combined context $(\vec{x}, \vec{y})$; that is, $\phi \vdash_{\vec{x}} \psi$ and $\psi \vdash_{\vec{y}} \phi$ are provable in $\mathbb{T}$.

$\theta$ is **$\mathbb{T}$-provably functional** if it satisfies the following three sequents in $\mathbb{T}$:

1. **Totality:** For every $\vec{x}$ satisfying $\phi$, there exists some $\vec{y}$ such that $\theta$ holds.
   $$
   \phi \vdash_{\vec{x}} (\exists \vec{y}) \, \theta
   $$
2. **Well-definedness:** Whenever $\theta$ holds, $\phi$ holds for $\vec{x}$ and $\psi$ holds for $\vec{y}$.
   $$
   \theta \vdash_{\vec{x}, \vec{y}} \phi \land \psi
   $$
3. **Single-valuedness:** If $\theta$ holds for $\vec{y}$ and also for $\vec{z}$ (with the same $\vec{x}$), then $\vec{y}$ and $\vec{z}$ must be equal.
   $$
   (\theta \land \theta[\vec{z}/\vec{y}]) \vdash_{\vec{x}, \vec{y}, \vec{z}} (\vec{y} = \vec{z})
   $$

**Notation.** The last sequent uses a notation that we have not introduced yet: $\theta[\vec{z}/\vec{y}]$ denotes **substitution**. It is the formula obtained from $\theta$ by simultaneously replacing each free occurrence of $y_i$ with $z_i$ For example, if $\theta(x,y)$ is $y = x \cdot x$, then $\theta[z/y]$ is $z = x \cdot x$.

### 3.3. Composition

The composite of two arrows

$$
\{\vec{x} \cdot \phi\} \xrightarrow{[\theta]} \{\vec{y} \cdot \psi\} \xrightarrow{[\gamma]} \{\vec{z} \cdot \chi\}
$$

is defined as the $\mathbb{T}$-provable-equivalence class of the formula:

$$
(\exists \vec{y}) \, (\theta \land \gamma)
$$

This formula expresses the relation obtained by "composing" $\theta$ and $\gamma$: it holds for $\vec{x}$ and $\vec{z}$ exactly when there exists some $\vec{y}$ such that both $\theta(\vec{x}, \vec{y})$ and $\gamma(\vec{y}, \vec{z})$ hold.

### 3.4. Identity

The identity arrow on an object $\{\vec{x} \cdot \phi\}$ is given by:

$$
\{\vec{x} \cdot \phi\} \xrightarrow{[\phi \land \vec{x} = \vec{x}']} \{\vec{x}' \cdot \phi[\vec{x}'/\vec{x}]\}
$$

Intuitively, the identity relation on $\phi$ holds exactly when the new variables $\vec{x}'$ are a renaming of $\vec{x}$ and $\phi$ holds for both.

> **Note:** It's a good exercise to make sure that identity and composition are effectively **$\mathbb{T}$-provably functional**, by testing that these morphisms satisfy the corresponding sequents.

Before continuing, there is a question that we should answer: why, for a morphism, the contexts of the domain and codomain are assumed to be disjoint? And why does this not cause any problem?

A reason for assuming that these contexts are disjoint is that in the single-valuedness sequent, the sequent $(\theta \land \theta[\vec{z}/\vec{y}]) \vdash_{\vec{x}, \vec{y}, \vec{z}} (\vec{y} = \vec{z})$ works with substitution: $\theta[\vec{z}/\vec{y}]$ is $\theta$, but with the free variables $\vec{y}$ substituted by the variables $\vec{z}$. As we specified in the definition of the **renaming (alpha-equivalence)** of objects, the sequent $(\theta \land \theta[\vec{z}/\vec{y}]) \vdash_{\vec{x}, \vec{y}, \vec{z}} (\vec{y} = \vec{z})$ aims to say that for the same inputs $\vec{x}$, $\theta$ gives the same "output"; but if $\vec{x}$ and $\vec{y}$ have a variable in common, this variable will be changed by the substitution $\theta[\vec{z}/\vec{y}]$, and this degrades the meaning of the sequent $(\theta \land \theta[\vec{z}/\vec{y}]) \vdash_{\vec{x}, \vec{y}, \vec{z}} (\vec{y} = \vec{z})$.

This supposition is not a problem because an object $\{\vec{x} \cdot \phi\}$ is an equivalence class, and if the representative of the class has variables in common with the other object of the arrow, we only need to replace the representative with one that is disjoint.

### 3.5. Isomorphisms

An isomorphism in a category $\mathcal{C}$ is a morphism $f: A \to B$ such that there exists a morphism $g: B \to A$ such that $f\circ g = I_{B}$ and $g \circ f = I_{A}$. In the syntactic category, using the above totality and well-definedness sequents, existence of a morphism $\{\vec{x} \cdot \phi\} \longrightarrow \{\vec{y} \cdot \psi\}$ implies that $\phi \vdash_{\vec{x}} (\exists \vec{y}) \, \psi$ ; so existence of an isomorphism implies that $\phi \vdash_{\vec{x}} (\exists \vec{y}) \, \psi$ and $\psi \vdash_{\vec{y}} (\exists \vec{x}) \, \phi$ .

## 4. Products

### 4.1. Definition of Product

A product in a category $\mathcal{C}$ in category theory is a <a href="https://en.wikipedia.org/wiki/Limit_(category_theory)" class="text-accent font-bold" target="_blank" rel="noopener noreferrer">limit</a> of a very special <a href="https://en.wikipedia.org/wiki/Functor" class="text-accent font-bold" target="_blank" rel="noopener noreferrer">functor</a>; this definition is analogous to an <a href="/posts/forcing-injectivity/#5-what-is-an-equalizer-" class="text-accent font-bold">equalizer</a> but with a functor indexed by:

$$
\bullet \qquad \bullet
$$

The functor $F: J \to \mathcal{C}$ will be:

$$
F(1) = A \qquad F(2) = B
$$

The diagram that represents a product is simply:

```tikz
\usepackage{tikz-cd}
\begin{document}
\begin{tikzcd}
    A & B
\end{tikzcd}
\end{document}
```

A <a href="https://en.wikipedia.org/wiki/Cone_(category_theory)" class="text-accent font-bold" target="_blank" rel="noopener noreferrer">cone</a> with nadir $N$ will be:

```tikz
\usepackage{tikz-cd}

\begin{document}

\begin{tikzcd}[column sep=large,row sep=large]
    & N \arrow[dl, "p_1"'] \arrow[dr, "p_2"] & \\
    A & & B
\end{tikzcd}

\end{document}
```

And the <a href="https://en.wikipedia.org/wiki/Cone_(category_theory)#Universal_cones" class="text-accent font-bold" target="_blank" rel="noopener noreferrer">universal cone</a> with nadir $A \times B$:

```tikz
\usepackage{tikz-cd}

\begin{document}

\begin{tikzcd}[column sep=large,row sep=large]
    & N \arrow[dl, "p_1"', bend right] \arrow[d, dashed, "{\exists!\, k}"] \arrow[dr, "p_2"', bend left] & \\
    A & A \times B \arrow[l, "\pi_1"'] \arrow[r, "\pi_2"] & B
\end{tikzcd}

\end{document}
```

This universal cone is the product $A\times B$.

### 4.2. Cartesian Categories

A category $\mathcal{C}$ is **cartesian** if and only if it has finite products; that is, the empty product (<a href="https://en.wikipedia.org/wiki/Initial_and_terminal_objects" class="text-accent font-bold" target="_blank" rel="noopener noreferrer">terminal object</a>) and products for pairs of objects.

### 4.3. Syntactic Category is Cartesian

As we said, we only need to see that the syntactic category $\mathcal{C}_\mathbb{T}$ has a terminal object and products for pairs of objects.

#### 4.3.1. Terminal Object

The **terminal object** in $\mathcal{C}_{\mathbb{T}}$ is:

$$
1 := \{\emptyset \cdot \top\}
$$

the formula-in-context with empty context and formula $\top$.

For any object $\{\vec{x} \cdot \phi\}$, there is a unique morphism:

$$
!_{\{\vec{x} \cdot \phi\}} : \{\vec{x} \cdot \phi\} \longrightarrow 1
$$

given by the equivalence class of the formula:

$$
\theta(\vec{x}) := \top
$$

which is trivially provably functional.

#### 4.3.2. Binary Product

For any two objects:

$$
A := \{\vec{x} \cdot \phi\}, \qquad B := \{\vec{y} \cdot \psi\}
$$

where $\vec{x}$ and $\vec{y}$ are disjoint contexts (we can always rename variables to ensure this); their **product** in $\mathcal{C}_{\mathbb{T}}$ is:

$$
A \times B := \{\vec{x}, \vec{y} \cdot \phi \land \psi\}
$$

##### 4.3.2.1. Projection Morphisms

The **first projection** is:

$$
\pi_1 : \{\vec{x}, \vec{y} \cdot \phi \land \psi\} \longrightarrow \{\vec{x'} \cdot \phi\}
$$

given by:

$$
\pi_1(\vec{x}, \vec{y}, \vec{x}') := (\vec{x} = \vec{x}') \land \phi \land \psi
$$

The **second projection** is:

$$
\pi_2 : \{\vec{x}, \vec{y} \cdot \phi \land \psi\} \longrightarrow \{\vec{y'} \cdot \psi\}
$$

given by:

$$
\pi_2(\vec{x}, \vec{y}, \vec{y}') := (\vec{y} = \vec{y}') \land \phi \land \psi
$$

##### 4.3.2.2. Universal Property

For any object $\{\vec{z} \cdot \chi\}$ equipped with morphisms:

$$
\theta : \{\vec{z} \cdot \chi\} \longrightarrow \{\vec{x} \cdot \phi\}
$$

and

$$
\gamma : \{\vec{z} \cdot \chi\} \longrightarrow \{\vec{y} \cdot \psi\}
$$

there exists a **unique** morphism:

$$
\langle \theta, \gamma \rangle : \{\vec{z} \cdot \chi\} \longrightarrow \{\vec{x}, \vec{y} \cdot \phi \land \psi\}
$$

given by:

$$
\langle \theta, \gamma \rangle(\vec{z}, \vec{x}, \vec{y}) := \theta(\vec{z}, \vec{x}) \land \gamma(\vec{z}, \vec{y})
$$

This morphism is the unique one satisfying:

$$
\pi_1 \circ \langle \theta, \gamma \rangle = \theta
$$

and

$$
\pi_2 \circ \langle \theta, \gamma \rangle = \gamma
$$

#### 4.3.3. Product Diagram

For objects $\{\vec{x} \cdot \phi\}$ and $\{\vec{y} \cdot \psi\}$, the product diagram is:

```tikz
\usepackage{tikz-cd}

\begin{document}

\begin{tikzcd}[column sep=large,row sep=large]
    & \{\vec{z} \cdot \chi\} \arrow[dl, "\theta"', bend right] \arrow[d, dashed, "{\exists!\, \langle \theta, \gamma \rangle}"] \arrow[dr, "\gamma"', bend left] & \\
    \{\vec{x} \cdot \phi\} & \{\vec{x}, \vec{y} \cdot \phi \land \psi\} \arrow[l, "\pi_1"'] \arrow[r, "\pi_2"] & \{\vec{y} \cdot \psi\}
\end{tikzcd}

\end{document}
```

and commutativity is the universal property.

This shows that the syntactic category is a cartesian category, so it is a candidate for being used in a $\Sigma$-structure.

## 5. Σ-Structures

Let $\Sigma$ be a first-order signature. A **structure** $M$ over $\Sigma$ in a cartesian category $\mathcal{E}$ is specified by the following data:

1. **Sorts:** For any sort $A$ of $\Sigma$, an object
   $$
   M(A) \in \mathcal{E}
   $$
2. **Function Symbols:** For any function symbol
   $$
   f: A_1, \ldots, A_n \to B
   $$
   of $\Sigma$, an arrow
   $$
   M(f): M(A_1) \times \cdots \times M(A_n) \longrightarrow M(B)
   $$
   in $\mathcal{E}$.
3. **Relation Symbols:** For any relation symbol
   $$
   R \rightarrowtail A_1, \ldots, A_n
   $$
   of $\Sigma$, a subobject
   $$
   M(R) \rightarrowtail M(A_1) \times \cdots \times M(A_n)
   $$
   in $\mathcal{E}$.

Now let's see an example of a concrete syntactic category.

## 6. Group Syntactic Category

Now that we know the signature and sequents of group theory, we know what the objects and morphisms of the syntactic category of group theory $\mathcal{C}_{\mathbb{T}_{\mathsf{Grp}}}$ are, but there are some special morphisms and one special object that we shall see.

### 6.1. Operations as Morphisms

Consider the object $\{x : G \cdot \top\}$ in the category $\mathcal{C}_{\mathbb{T}_{\mathsf{Grp}}}$, which represents an arbitrary element $x$ of the group $G$.

To define group multiplication, we must specify it for every pair $(x,y) \in G \times G$. Therefore, the operation should be defined on the object $\{x : G, y : G \cdot \top\}$. In $\mathcal{C}_{\mathbb{T}_{\mathsf{Grp}}}$, this object is precisely the categorical product

$$
\{x : G \cdot \top\} \times \{y : G \cdot \top\}.
$$

which is something very convenient for the next

#### 6.1.1. The Identity (Unit)

The identity element is a morphism from the terminal object to the carrier object:

$$
\{\emptyset \cdot \top\} \longrightarrow \{x : G \cdot \top\}
$$

It is given by the equivalence class of the formula:

$$
\theta _{e}(x) := (x = e)
$$

#### 6.1.2. The Multiplication (Product)

The multiplication operation is a morphism from the product of the carrier with itself to the carrier:

$$
\{x : G, y : G \cdot \top\} \longrightarrow \{z : G \cdot \top\}
$$

It is given by the equivalence class of the formula:

$$
\theta_{\cdot}(x, y, z) := (z = x \cdot y)
$$

#### 6.1.3. The Inverse

The inverse operation is a morphism from the carrier to itself:

$$
\{x : G \cdot \top\} \longrightarrow \{y : G \cdot \top\}
$$

It is given by the equivalence class of the formula:

$$
\theta _{-1}(x, y) := (y = x^{-1})
$$

Note that all these morphisms act on one special object $\{ x \cdot \top \}$.

### 6.2. The abstract Group Object

The **abstract group object** in $\mathcal{C}_{\mathbb{T}_{\mathsf{Grp}}}$ is the object $\{x : G \cdot \top\}$. This object, equipped with $\theta _{e}$, $\theta _{\cdot}$ and $\theta _{-1}$, has the structure of a group; let's see why.

#### 6.2.1. Associativity

In $\mathcal{C}_\mathbb{G}$, consider this diagram:

```tikz
\usepackage{tikz-cd}

\begin{document}

\begin{tikzcd}[column sep=large, row sep=large]
    \{x, y, z \cdot \top\} \arrow[r, "\theta_{\cdot} \times \mathrm{Id}_{\{x \cdot \top\}}"] \arrow[d, "\mathrm{Id}_{\{x \cdot \top\}} \times \theta_{\cdot}"'] & \{xy, z' \cdot \top\} \arrow[d, "\theta_{\cdot}"] \\
    \{x', yz \cdot \top\} \arrow[r, "\theta_{\cdot}"'] & \{xyz \cdot \top\}
\end{tikzcd}

\end{document}
```

Commutativity means: $\theta_{\cdot} \circ (\theta_{\cdot} \times id_{\{ z \cdot \top \}}) = (id_{\{ x \cdot \top \}} \times \theta_{\cdot}) \circ \theta_{\cdot}$; let's break down these morphisms.

Top morphism:

$$
\theta_{\cdot} \times \mathrm{Id}_{\{z \cdot \top\}} := (xy = x \cdot y) \land (z' = z)
$$

Right morphism:

$$
\theta_{\cdot} := (xyz = xy \cdot z')
$$

Composition $\theta_{\cdot} \circ (\theta_{\cdot} \times id_{\{ z \cdot \top \}})$:

$$
(\exists xy, z') \big( (xy = x \cdot y) \land (z' = z) \land (xyz = xy \cdot z') \big)
$$

This formula is $\mathbb{T}_{\mathsf{Grp}}$-provably equivalent to:

$$
xyz = (x \cdot y) \cdot z
$$

Analogously, bottom left composition is:

$$
xyz = x \cdot (y \cdot z)
$$

Then, by the associativity axiom $\top \vdash_{\emptyset} (x \cdot y) \cdot z = x \cdot (y \cdot z)$, this proves $\theta_{\cdot} \circ (\theta_{\cdot} \times id_{\{ z \cdot \top \}}) = (id_{\{ x \cdot \top \}} \times \theta_{\cdot}) \circ \theta_{\cdot}$, i.e., the diagram commutes.

#### 6.2.2. Identity Element

Existence of the neutral element is guaranteed by:

```tikz
\usepackage{tikz-cd}

\begin{document}

\begin{tikzcd}[column sep=large, row sep=large]
    \{\emptyset \cdot \top\} \arrow[r, "\theta_e"] & \{x \cdot \top\}
\end{tikzcd}

\end{document}
```

#### 6.2.3. Inverse Element

Let $a := \langle \mathrm{id}_G, \theta_{-1} \rangle$ and $b := \langle \theta_{-1}, \mathrm{id}_G \rangle.$

Intuitively, $a$ takes an element $x \in G$ and sends it to the pair $(x, x^{-1})$, while $b$ takes $x \in G$ and sends it to the pair $(x^{-1}, x)$. In other words,

$$
a(x) = (x, x^{-1}), \qquad b(x) = (x^{-1}, x).
$$

The invertibility property is expressed by the commutativity of the following diagram:

```tikz
\usepackage{tikz-cd}

\begin{document}

\begin{tikzcd}[column sep=huge, row sep=large]
\{x : G \cdot \top\} \arrow[r, "a"] \arrow[rd, "\theta_e"'] &
\{x_l, x_r : G \cdot \top\} \arrow[d, "m"] &
\{x : G \cdot \top\} \arrow[l, "b"'] \arrow[ld, "\theta_e"] \\
& \{x' : G \cdot \top\} &
\end{tikzcd}

\end{document}
```

That is, $m \circ a = \theta_e$ and $m \circ b = \theta_e$ hold.

Let us verify the first equation; the second is analogous. The morphism $a$ is given by

$$
a := (x_l = x) \land (x_r = x^{-1}),
$$

the multiplication $m$ is given by

$$
m := (x' = x_l \cdot x_r),
$$

and their composition $m \circ a$ is therefore

$$
(\exists x_l, x_r)\big( (x_l = x) \land (x_r = x^{-1}) \land (x' = x_l \cdot x_r) \big).
$$

This formula is $\mathbb{T}_{\mathsf{Grp}}$-provably equivalent to

$$
x' = x \cdot x^{-1},
$$

and, by the inverse axiom $\top \vdash_{\emptyset} x \cdot x^{-1} = e$, to

$$
x' = e.
$$

But $x' = e$ is precisely the formula defining the constant morphism $\theta_e$. Hence $m \circ a = \theta_e$.

Analogously, $b$ is given by

$$
b := (x_l = x^{-1}) \land (x_r = x),
$$

so the composition $m \circ b$ is

$$
(\exists x_l, x_r)\big( (x_l = x^{-1}) \land (x_r = x) \land (x' = x_l \cdot x_r) \big),
$$

which is $\mathbb{T}_{\mathsf{Grp}}$-provably equivalent to

$$
x' = x^{-1} \cdot x,
$$

and hence, by the other inverse axiom $\top \vdash_{\emptyset} x^{-1} \cdot x = e$, to $x' = e$. Therefore $m \circ b = \theta_e$.

These equations express the two inverse laws: multiplying any group element by its inverse, in either order, yields the identity element.

#### 6.2.4. Conclusion

This proves all the group axioms for the object $\{x : G \cdot \top\}$ equipped with multiplication $\theta_{\cdot}$, unit $\theta_e$ and inverse $\theta_{-1}$; hence $(\{x : G \cdot \top\}, \theta_{\cdot})$ is indeed a group.

> **Note:** The commutativity of the last diagrams is what guarantees that $(\{x : G \cdot \top\}, \theta_{\cdot})$ is a group in $\mathcal{C}_{\mathbb{T}_{\mathsf{Grp}}}$, and this commutativity follows directly from the axioms of $\mathbb{T}_{\mathsf{Grp}}$. If you have some background in category theory, you may know that functors preserve commutative diagrams, so the group structure can be transported to other categories via functors from $\mathcal{C}_{\mathbb{T}_{\mathsf{Grp}}}$. We will dive into this fact next.

## 7. Canonical Σ-Structure

### 7.1. The Σ-Structure

We already know the group theory signature and that the syntactic category is cartesian, so let's define a **Σ-structure** $\mathcal{M}$ in the syntactic category $\mathcal{C}_{\mathbb{T}_{\mathsf{Grp}}}$ by interpreting each component of the signature as follows:

### 7.2. Sorts

For the unique sort $G$ of $\Sigma_{\mathsf{Grp}}$, we assign the object:

$$
\mathcal{M}(G) := \{x : G \cdot \top\}
$$

### 7.3. Function Symbols

#### 7.3.1. The Identity Constant

The constant symbol $e : \to G$ is interpreted as a morphism from the terminal object:

$$
\mathcal{M}(e) : 1 \longrightarrow \mathcal{M}(G)
$$

given by the formula $\theta_{e}$.

#### 7.3.2. The Multiplication Operation

The binary function symbol $\cdot : G \times G \to G$ is interpreted as a morphism from the product of the carrier with itself:

$$
\mathcal{M}(\cdot) : \mathcal{M}(G) \times \mathcal{M}(G) \longrightarrow \mathcal{M}(G)
$$

given by the formula $\theta_{\cdot}$.

#### 7.3.3. The Inverse Operation

The unary function symbol $(-)^{-1} : G \to G$ is interpreted as a morphism from the carrier to itself:

$$
\mathcal{M}((-)^{-1}) : \mathcal{M}(G) \longrightarrow \mathcal{M}(G)
$$

given by the formula $\theta_{-1}$.

Now $\mathcal{M}$ is a **Σ-structure**; as we have seen before, it also satisfies all axioms of $\mathbb{T}_{Grp}$, so $\mathcal{M}$ is a <a href="https://ncatlab.org/nlab/show/model" class="text-accent font-bold" target="_blank" rel="noopener noreferrer">model</a> for $\mathbb{T}_{Grp}$.

## 8. Cartesian Functors

### 8.1. Definition

Let $\mathcal{C}$ and $\mathcal{D}$ be cartesian categories. A functor $F:\mathcal{C}\to\mathcal{D}$ is called **cartesian** if it preserves finite products, i.e.,

$$
F(A\times_{C} B) \cong F(A)\times_{D} F(B)
$$

for all $A,B\in\mathcal{C}$ where $\cong$ denotes isomorphism.

Informally, one often writes this as

$$
F(A\times B)=F(A)\times F(B).
$$

### 8.2. Functors Define Groups

Now consider a cartesian functor $F: \mathcal{C}_{\mathbb{T}_{\mathsf{Grp}}} \to \mathbf{Set}$ this functor is possible because $\mathcal{C}_{\mathbb{T}_{\mathsf{Grp}}}$ is cartesian and $\mathbf{Set}$ is complete, in particular cartesian; this functor sends $\{x : G \cdot \top\}$ to a specific set $G$, and $\theta _{e}$, $\theta _{\cdot}$ and $\theta _{-1}$ to morphisms in $\mathbf{Set}$. The incredible fact is that these morphisms in $\mathbf{Set}$ together with $G$ form a group, because every axiom of $\mathbb{T}_{Grp}$ was codified in $\mathcal{C}_{\mathbb{T}_{\mathsf{Grp}}}$ as a commutative diagram, and it is a basic result of category theory that every commutative diagram is indeed a commutative diagram in the image of a functor.

### 8.3. Example: the Group of Integers

Consider the functor

$$
F_{\mathbb Z}:\mathcal C_{\mathbb T_{\mathsf{Grp}}}\to \mathbf{Set}.
$$

It is defined on the generic object $\{x \cdot \top\}$ by

$$
F_{\mathbb Z}(G)=\mathbb Z,
$$

$$
F_{\mathbb Z}(G^n)=\mathbb Z^n,
\qquad
F_{\mathbb Z}(1)=\{\ast\}.
$$

On the basic group operations it is defined by

$$
F_{\mathbb Z}(\theta_e):\{\ast\}\to \mathbb Z,
\qquad
\ast\mapsto 0,
$$

$$
F_{\mathbb Z}(\theta_\cdot):\mathbb Z\times\mathbb Z\to \mathbb Z,
\qquad
(m,n)\mapsto m+n,
$$

$$
F_{\mathbb Z}(\theta_{-1}):\mathbb Z\to \mathbb Z,
\qquad
n\mapsto -n.
$$

In general, for every group $H$ we can define a functor $F_H:\mathcal{C}_{\mathbb{T}_{\mathsf{Grp}}}\to \mathbf{Set}$ that defines it analogously.

We have only talked about group theory because it is a very simple example, but this works not only for this theory: the axioms of every geometric theory will be codified as commutative diagrams in the corresponding syntactic category, and every cartesian functor from this category to another will be a model for the theory.

## 9. References

- **Emily Riehl.** <a href="https://math.jhu.edu/~eriehl/context/" class="text-accent font-bold" target="_blank" rel="noopener noreferrer">_Category Theory in Context_</a>. Aurora: Dover Modern Math Originals. Mineola, NY: Dover Publications, 2016.
- **Paolo Aluffi.** <a href="https://bookstore.ams.org/gsm-104" class="text-accent font-bold" target="_blank" rel="noopener noreferrer">_Algebra: Chapter 0_</a>. Graduate Studies in Mathematics, vol. 104. Providence, RI: American Mathematical Society, 2009.
- **Olivia Caramello.** <a href="https://global.oup.com/academic/product/theories-sites-toposes-9780198758914" class="text-accent font-bold" target="_blank" rel="noopener noreferrer">_Theories, Sites, Toposes: Relating and studying mathematical theories through topos-theoretic 'bridges'_</a>. Oxford: Oxford University Press, 2017.
