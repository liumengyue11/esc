<template>
    <div>
        <Row>
            <Col span = "12">
                 <Form ref="form" :model="formdate" :rules="ruledate" :label-width="80">
                    <FormItem label="姓名" prop="name">
                        <Input v-model="formdate.name"></Input>
                    </FormItem>
                    <FormItem label="证件类型" prop="idcardtype">
                        <Select v-model="formdate.idcardtype">
                            <Option value="idcard">身份证</Option>
                            <Option value="militarycard">军官证</Option>
                        </Select>
                    </FormItem>
                    <FormItem v-if="formdate.idcardtype == 'idcard'" label="身份证" prop="idcard">
                        <Input  v-model="formdate.idcard"></Input>
                    </FormItem>
                    <FormItem v-if="formdate.idcardtype == 'militarycard'" label="军官证" prop="militarycard">
                        <Input  v-model="formdate.militarycard"></Input>
                    </FormItem>
                    <FormItem label="购买日期" prop="buydate">
                        <DatePicker v-model="formdate.buydate" type="date" placeholder="Select date" style="width: 200px"></DatePicker>
                    </FormItem>
                    <FormItem label="品牌/车系" prop="bAnds">
                        <Cascader :data="formdate.data" v-model="formdate.bAnds"></Cascader>
                    </FormItem>
                    <FormItem label="颜色" prop="color">
                        <RadioGroup v-model="formdate.color">
                            <Radio label="red">红</Radio>
                            <Radio label="black">黑</Radio>
                            <Radio label="white">白</Radio>
                            <Radio label="blue">蓝</Radio>
                            <Radio label="yellow">黄</Radio>
                            <Radio label="green">绿·</Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="handleSubmit">提交</Button>
                    </FormItem>
                 </Form>
            </Col>
        </Row>
       
    </div>
</template>

<script>
    export default {
        data(){
            return {
                formdate : {
                    name : "",
                    idcard : "",
                    idcardtype : "",
                    militarycard : "",
                    buydate : "",
                    bAnds: ['jiangsu', 'suzhou', 'zhuozhengyuan'],
                    data: [
                    {
                        value: 'A',
                        label: 'A',
                        children: [
                            {
                                value: 'aodi',
                                label: '奥迪',
                                children : [
                                    {
                                        value: 'A6L',
                                        label: 'A6L'
                                    },
                                    {
                                        value: 'Q5',
                                        label: 'Q5'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                       value: 'B',
                        label: 'B',
                        children: [
                            {
                                value: 'baoma',
                                label: '宝马',
                                children : [
                                    {
                                        value: 'X5',
                                        label: 'X5'
                                    },
                                    {
                                        value: 'X5',
                                        label: 'X5'
                                    }
                                ]
                            },
                            {
                               value: 'biaozhi',
                                label: '标致',
                                children : [
                                    {
                                        value: '308',
                                        label: '308'
                                    },
                                    {
                                        value: '408',
                                        label: '408'
                                    }
                                ] 
                            }
                        ] 
                    }],
                    color : ""
                    
                },
                ruledate : {
                    name: [
                        { required: true, message: '姓名不能为空！', trigger: 'blur' },
                        { type: 'string', pattern: /^[\u4e00-\u9fa5]+(·[\u4e00-\u9fa5]+)*$/, message: '姓名填写错误！', trigger: 'blur' }
                    ],
                    idcardtype : [
                         { required: true, message: '请选择证件类型！'}
                    ],
                    idcard : [
                        { required: true, message: '本项不能为空！', trigger: 'blur' },
                        { type: 'string', pattern: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/, message: '填写错误！', trigger: 'blur' }
                    ],
                    militarycard : [
                        { required: true, message: '本项不能为空！', trigger: 'blur' },
                        { type: 'string', pattern:  /^[a-zA-Z0-9]{7,21}$/, message: '填写错误！', trigger: 'blur' }
                    ],
                    buydate : [
                        { required: true, message: '请选择日期！'},
                    ],
                    bAnds : [
                        { required: true, message: '请选择品牌和车系！'}
                    ],
                    color : [
                        { required: true, message: '请选择车辆颜色！'}
                    ]
                } 
            }
        },
        methods : {
            handleSubmit(){
                this.$refs.form.validate(data => {
                    if(data){
                        this.$store.commit("stepStore/changeStep", {step : 2})
                    }else {
                        this.$Message.error('提交失败!');
                    }
                })
            }
        }
    }
</script>

<style scoped lang = "less">
    
</style>