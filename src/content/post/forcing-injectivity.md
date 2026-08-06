---
title: 'Forcing Injectivity: From Quotients to Equalizers'
description: 'How quotients and equalizers force injectivity, from vector spaces and groups to category theory.'
publishDate: '6 August 2026'
tags: ['Math', 'Category Theory', 'Linear Algebra', 'Abstract Algebra']
---

Functions are one of the most important mathematical objects, and <a href="https://ncatlab.org/nlab/show/injection" class="text-accent font-bold" target="_blank" rel="noopener noreferrer">injectivity</a> is maybe the most important property that a function can have.


Many times you have a function that is not injective and you want to make it injective. In linear algebra and group theory, the solution is to go to the quotient with the morphism's kernel.


### 1. Quotient vectorial spaces
When you have a <a href="https://es.wikipedia.org/wiki/Espacio_vectorial" class="text-accent font-bold" target="_blank" rel="noopener noreferrer">vectorial space</a> V and a subspace U, the quotient space $V/U$ is:
$$V/U = \{v \oplus U: v \in V\}$$
### 2. Quotient groups
When you have a <a href="https://ncatlab.org/nlab/show/group" class="text-accent font-bold" target="_blank" rel="noopener noreferrer">group</a> G and a <a href="https://ncatlab.org/nlab/show/normal+subgroup" class="text-accent font-bold" target="_blank" rel="noopener noreferrer">normal subgroup</a> H, the quotient $G/U$ group is:
$$ G/U =\{ g \cdot H : g \in G \}$$
### 3. Linear Transformation kernel
$$
\begin{gathered}
\operatorname{Ker}(T: V \to W) := \{v \in V \mid T(v) = W_{0} \}
\end{gathered}
$$
### 4. Forcing injectivity

Every <a href="https://aga.frba.utn.edu.ar/definicion-y-propiedades-de-las-transformaciones-lineales/" class="text-accent font-bold" target="_blank" rel="noopener noreferrer">linear transformation</a> $T: V \to W$ induces a linear transformation $T': V/\operatorname{Ker}(T) \to W$ in the following way:


$$
T': V/\operatorname{Ker}(T) \to W, \quad v + \operatorname{Ker}(T) \mapsto T(v)
$$


This linear transformation is always injective. 
#### 4.1 Proof


$$
T'(v_1 + \operatorname{Ker}(T)) = T'(v_2 + \operatorname{Ker}(T))
$$


Then, by definition of $T'$, we have:


$$
T(v_1) = T(v_2)
$$


Since $T$ is linear, this implies:


$$
T(v_1 - v_2) = 0
$$


so $v_1 - v_2 \in \operatorname{Ker}(T)$. because $\operatorname{Ker}(T)$ is indeed a vectorial subspace of V, and addition is closed in this vectorial subspace. Therefore:


$$
v_1 + \operatorname{Ker}(T) = v_2 + \operatorname{Ker}(T)
$$


Hence $T'$ is injective. $\blacksquare$


The construction above shows that **every linear map factors through an injective map**. This trick is not only for vectorial spaces; we can do something analogous with groups and normal subgroups. This idea of "forcing injectivity" by identifying elements that differ by elements of the kernel is a fundamental principle that will later generalize to the elegant categorical notion of **equalizers**.


### 5. What is an equalizer ?
An equalizer in <a href="https://ncatlab.org/nlab/show/category" class="text-accent font-bold" target="_blank" rel="noopener noreferrer">category</a> theory is a limit of a very special <a href="https://en.wikipedia.org/wiki/Functor" class="text-accent font-bold" target="_blank" rel="noopener noreferrer">functor</a>. Every categorical diagram can be thought of as a category by completing it with the missing arrows. For example: 
$$
\begin{array}{ccc}
& A & \\
& \swarrow{f} \searrow{g} & \\
B & \xrightarrow{h} & C
\end{array}
$$
This diagram is not a category because identity arrows are missing, but we can complete this diagram to a category like this: 
$$
\begin{array}{ccccc}
& & A & & \\
& \text{id}_A \nearrow & & \searrow{g} & \\
A & & & & C \\
& \searrow{f} & & \nearrow{\text{id}_C} & \\
& & B & & \\
& & \downarrow{\text{id}_B} & & \\
& & B & &
\end{array}
$$
This is now a category. Now you can think of every diagram as a category, but a diagram has two parts: points and arrows and the names. Thinking like this, you can think of a diagram as a functor $F: J \to C$ where J is the category of the draw and C is the category where the names live. Basically, when you draw a diagram, you assign to every point and every arrow a name, with some conditions; this is basically what functors do, so you can interpret a diagram as a functor.


An equalizer is the <a href="https://en.wikipedia.org/wiki/Limit_(category_theory)" class="text-accent font-bold" target="_blank" rel="noopener noreferrer">limit of a functor</a> indexed by the following diagram: 
$$
\bullet \rightrightarrows \bullet
$$
A limit object of this diagram can be defined as the universal <a href="https://en.wikipedia.org/wiki/Cone_(category_theory)" class="text-accent font-bold" target="_blank" rel="noopener noreferrer">cone</a> over the functor $F: J \to C$: 
$$
\overset{A}{\bullet} \mathrel{\substack{\xrightarrow{f} \\ \xrightarrow[g]{}}} \overset{B}{\bullet}
$$
A cone with nadir N over this functor has the following property:
$$
Z \xrightarrow{z} A \mathrel{\substack{\xrightarrow{f} \\ \xrightarrow[g]{}}} B
\qquad \text{with } f \circ z = g \circ z
$$
And a universal cone E over this functor has the following property:

$$
\begin{array}{ccc}
Z & & \\
{\scriptstyle \exists!\,k}\Big\downarrow & {\scriptstyle \searrow\; z} & \\
E & \xrightarrow[\quad e\quad]{} & A \underset{g}{\overset{f}{\rightrightarrows}} B
\end{array}
$$

This is: $\forall Z \in C$  equipped with a morphism  $z: Z \to A$ such that  $f\circ z = g \circ z$, there is a **unique** morphism $k: Z \to E$ such that: $k \circ e = z$


Now let's think about this equalizer:

$$
\begin{array}{ccc}
Z & & \\
{\scriptstyle \exists!\,k}\Big\downarrow & {\scriptstyle \searrow\; z} & \\
\operatorname{Ker}(T) & \xrightarrow[\quad i\quad]{} & V \underset{0}{\overset{T}{\rightrightarrows}} W
\end{array}
$$

First, let's prove that indeed Ker(T) is an equalizer.

The unique function $k$ is $z$ restricted to $\operatorname{Ker}(T)$; this is:
$$k=z': Z \to \operatorname{Ker}(T), \quad x \mapsto z(x)$$
Suppose that there exists $$\alpha: Z \to \operatorname{Ker}(T) \text{ such that }i \circ \alpha = z, \text{then } i\circ \alpha = i\circ z'$$
$i$ is indeed a <a href="https://en.wikipedia.org/wiki/Monomorphism" class="text-accent font-bold" target="_blank" rel="noopener noreferrer">monomorphism</a>, then it is left-cancellable; therefore $\alpha = z$. $\blacksquare$


We have seen that T induces an injective linear transformation $T': V/\operatorname{Ker}(T)) \to W$ because in $V/\operatorname{Ker}(T)$ all elements of $\operatorname{Ker}(T)$ are the same.


Now let us see the same but with groups. The equalizer is:

$$
\begin{array}{ccc}
Z & & \\
{\scriptstyle \exists!\,k}\Big\downarrow & {\scriptstyle \searrow\; z} & \\
\operatorname{Ker}(\varphi) & \xrightarrow[\quad i\quad]{} & G \underset{e}{\overset{\varphi}{\rightrightarrows}} H
\end{array}
$$

The proof that $\operatorname{Ker}(\varphi)$ is indeed an equalizer is analogous to the case of vectorial spaces; we need that the quotient $G/\operatorname{Ker}(\varphi)$ be a group. A sufficient condition for this is:  $\operatorname{Ker}(\varphi)$ should be a normal subgroup of $G$.
Let's prove this.


It is a basic result of group theory that $\operatorname{Ker}(\varphi)$ is a subgroup.


Now let $g\in G$ and $k\in\ker(\varphi)$. Then


$$
\varphi(gkg^{-1})
=\varphi(g)\varphi(k)\varphi(g^{-1})
=\varphi(g)e_H\varphi(g)^{-1}
=e_H.
$$


Therefore,


$$
gkg^{-1}\in\ker(\varphi).
$$


Hence,


$$
g\ker(\varphi)g^{-1}\subseteq\ker(\varphi).
$$


Replacing \(g\) by \(g^{-1}\) gives the reverse inclusion, so


$$
g\ker(\varphi)g^{-1}=\ker(\varphi).
$$


Thus,


$$
\ker(\varphi)\trianglelefteq G.
$$
$\blacksquare$


The first isomorphism theorem of group theory guarantees that the induced morphism $\varphi': G/\operatorname{Ker}(\varphi) \to H$ by $\varphi$ is indeed a monomorphism (an injective group <a href="https://en.wikipedia.org/wiki/Homomorphism" class="text-accent font-bold" target="_blank" rel="noopener noreferrer">homomorphism</a>). This result is also because in $G/\operatorname{Ker}(\varphi)$, all elements of $\operatorname{Ker}(\varphi)$ are the same.


Let's think about the pattern: we have two algebraic structures such that the notion of injectivity for structure-preserving morphisms between objects is equivalent to the condition that the only element of the domain object mapping to the identity element of the codomain object is the identity element of the domain—which, in the case of vector spaces, is the additive identity $V_0$, which is the operation used to construct the quotient. So, when we have structures in a category with equalizers, a notion of injectivity of morphisms characterized by a unique preimage of some element of the codomain of the morphism, quotient objects and the equalizer are suitable for quotients. We can always force injectivity by taking the morphism induced by the original morphism from the quotient of the domain (or from the equalizer of the original morphism and the constant morphism that sends all elements of the domain to the element that characterizes injectivity in the structure) to the codomain of the original morphism.


Also, if we restrict the codomain of the obtained morphism to the image of the original morphism, this new morphism will be a bijection, which is many times a highly desirable property that a morphism can have.