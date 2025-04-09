// import prisma from '@/lib/prisma'
// import argon2 from 'argon2'

// export async function POST(req) {
//   const body = await req.json()
//   const { email, password, username, questions } = body

//   const hashedPassword = await argon2.hash(password)

//   try {
//     const user = await prisma.user.create({
//       data: {
//         email,
//         password: hashedPassword,
//         username,
//         questions: {
//           create: questions
//         }
//       }
//     })

//     return new Response(JSON.stringify({ id: user.id, email: user.email }), { status: 201 })
//   } catch (err) {
//     return new Response(JSON.stringify({ error: err.message }), { status: 500 })
//   }
// }
import prisma from '@/lib/prisma'
import argon2 from 'argon2'

export async function POST(req) {
  const body = await req.json()
  const { email, password, username, questions } = body

  const hashedPassword = await argon2.hash(password)

  try {
    // Step 1: Create the user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        username,
      },
    })

    // Step 2: Insert security questions with prompt + answer + userId
    if (Array.isArray(questions)) {
      const formattedQuestions = questions.map((q) => ({
        prompt: q.prompt,
        answer: q.answer,
        userId: user.id,
      }))

      await prisma.securityQuestion.createMany({
        data: formattedQuestions,
      })
    }

    return new Response(JSON.stringify({ id: user.id, email: user.email }), { status: 201 })
  } catch (err) {
    console.error(err)
    return new Response(JSON.stringify({ error: err.message }), { status: 500 })
  }
}
