#### ScmccAndroid并行版本框架
    支持单机/多机并行运行
   
   
####持续集成；
    1. 废弃htmltestrunner，自定义测试报告
    2. 优化logger多进程执行
    3. 测试报告布局问题
    4. 兼容APP版本与多机器执行


#### 配置文件启动命令

    """
    启动服务端
    java -jar C://Users//SNake//Desktop//selenium-server-standalone-3.141.0.jar -role hub
    
    注册节点
    cd /d C:\\Users\\SNake\\PycharmProjects\\ScmccAndroid
    
    .\\libs\\nodejs\\node.exe .\\libs\\appium\\build\\lib\\main.js -p 4724 -bp 4734 -U 1f09cafe --nodeconfig .\\conf\\vivor9s.json
    
    .\\libs\\nodejs\\node.exe .\\libs\\appium\\build\\lib\\main.js -p 4723 -bp 4733 -U 1d32d8a27d14 --nodeconfig .\\conf\\redmi4x.json
    """