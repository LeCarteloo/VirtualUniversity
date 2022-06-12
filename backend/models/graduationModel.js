import mongoose, { mongo } from "mongoose";

const graduationSchema = mongoose.Schema({
    data: {
        status: {
            type: String,
            default: null
        },
        degree: {
            type: String,
            default: null
        },
        plagiarismStatus: {
            type: String,
            default: null
        },
        similarity: {
            type: String,
            default: null
        }
    },
    thesis: {
        date: {
            type: mongoose.Schema.Types.Date,
            default: null
        },
        room: {
            type: String,
            default: null
        },
        number: {
            type: Number,
            default: null,
        }
    },
    board: {
        supervisor: {
            type: String,
            default: null
        },
        reviewer: {
            type: String,
            default: null
        },
        secondSupervisor: {
            type: String,
            default: null
        },
        commiMember: {
            type: String,
            default: null
        }
    },
    grade: {
        supervisor: {
            type: mongoose.Schema.Types.Decimal128,
            default: null
        },
        reviewer: {
            type: mongoose.Schema.Types.Decimal128,
            default: null
        },
        thesis: {
            type: mongoose.Schema.Types.Decimal128,
            default: null
        },
        exam: {
            type: mongoose.Schema.Types.Decimal128,
            default: null
        },
        average: {
            type: mongoose.Schema.Types.Decimal128,
            default: null
        },
        final: {
            type: mongoose.Schema.Types.Decimal128,
            default: null
        }
    }

})