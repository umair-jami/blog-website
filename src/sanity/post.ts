// These are helper funtion that suggest us how to define our schema and fields
// difinetype is used to define the type of the schema and wrapped all contents inside it
// difinefield is used to define the fields of the schema
import { defineArrayMember, defineField, defineType } from "sanity";

export const post = defineType({
  name: "post",
  type: "document",
  title: "Post Doc",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Post title 1",
      description: "Title of the post",
      // validation
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: "Slug",
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [defineArrayMember({ type: "block" })],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
        name:'author',
        type:'reference',
        title:'Author',
        to:[{
            type:'author'
        }]
    })
    // defineField({
    //     name:"tags",
    //     title:"Tags",
    //     type:"array",
    //     of:[{type:"string"}],
    // {
    //     name:"gender",
    //     type:"string",
    //     title:"Gender",
    //     options: {
    //         list: [
    //           { title: 'Male', value: 'male' },
    //           { title: 'Female', value: 'female' },
    //         ],
    //         layout: 'radio',
    //         direction: 'horizontal',
    //       }
    // }
  ],
});
