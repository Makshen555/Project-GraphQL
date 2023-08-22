const {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLList,
    GraphQLInt, // Asegúrate de importar GraphQLInt desde el módulo 'graphql'
  } = require('graphql');
const Completion = require('./models/completion'); // Asegúrate de tener la ruta correcta
const Edit = require('./models/edit'); // Asegúrate de tener la ruta correcta
const Image = require('./models/image'); // Asegúrate de tener la ruta correcta

const CompletionType = new GraphQLObjectType({
    name: 'Completion',
    fields: () => ({
        name: { type: GraphQLString },
        model: { type: GraphQLString },
        prompt: { type: GraphQLString },
        temperature: { type: GraphQLInt },
        user: { type: GraphQLString }, // Cambia esto a un tipo apropiado si es necesario
        tags: { type: new GraphQLList(GraphQLString) }
    }),
});

const EditType = new GraphQLObjectType({
    name: 'Edit',
    fields: () => ({
        name: { type: GraphQLString },
        model: { type: GraphQLString },
        input: { type: GraphQLString },
        instruction: { type: GraphQLString },
        user: { type: GraphQLString }, // Cambia esto a un tipo apropiado si es necesario
        tags: { type: new GraphQLList(GraphQLString) },
    }),
});

const ImageType = new GraphQLObjectType({
    name: 'Image',
    fields: () => ({
        name: { type: GraphQLString },
        prompt: { type: GraphQLString },
        n: { type: GraphQLInt },
        size: { type: GraphQLString },
        user: { type: GraphQLString }, // Cambia esto a un tipo apropiado si es necesario
        tags: { type: new GraphQLList(GraphQLString) },
    }),
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        completionByName: {
            type: new GraphQLList(CompletionType),
            args: { name: { type: GraphQLString } },
            resolve(parent, args) {
                const caseInsensitiveRegex = new RegExp(args.name, 'i');
                return Completion.find({ name: caseInsensitiveRegex });
            },
        },
        completionByTags: {
            type: new GraphQLList(CompletionType),
            args: { tags: { type: new GraphQLList(GraphQLString) } },
            resolve(parent, args) {
                const caseInsensitiveTags = args.tags.map(tag => new RegExp(tag, 'i'));
                return Completion.find({ tags: { $in: caseInsensitiveTags } });
            },
        },
        editByName: {
            type: new GraphQLList(EditType),
            args: { name: { type: GraphQLString } },
            resolve(parent, args) {
                const caseInsensitiveRegex = new RegExp(args.name, 'i');
                return Edit.find({ name: caseInsensitiveRegex });
            },
        },
        editsByTags: {
            type: new GraphQLList(EditType),
            args: { tags: { type: new GraphQLList(GraphQLString) } },
            resolve(parent, args) {
                const caseInsensitiveTags = args.tags.map(tag => new RegExp(tag, 'i'));
                return Edit.find({ tags: { $in: caseInsensitiveTags } });
            },
        },
        imageByName: {
            type: new GraphQLList(ImageType),
            args: { name: { type: GraphQLString } },
            resolve(parent, args) {
                const caseInsensitiveRegex = new RegExp(args.name, 'i');
                return Image.find({ name: caseInsensitiveRegex });
            },
        },
        imageByTags: {
            type: new GraphQLList(ImageType),
            args: { tags: { type: new GraphQLList(GraphQLString) } },
            resolve(parent, args) {
                const caseInsensitiveTags = args.tags.map(tag => new RegExp(tag, 'i'));
                return Image.find({ tags: { $in: caseInsensitiveTags } });
            },
        },
    },
});

module.exports = new GraphQLSchema({
    query: RootQuery,
});
